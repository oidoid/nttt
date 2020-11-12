import {Board} from './Board'

test.each([
  ['0²', 0, []],
  ['1²', 1, [['?']]],
  [
    '2²',
    2,
    [
      ['?', '?'],
      ['?', '?']
    ]
  ],
  [
    '3² (default)',
    3,
    [
      ['?', '?', '?'],
      ['?', '?', '?'],
      ['?', '?', '?']
    ]
  ],
  [
    '4²',
    4,
    [
      ['?', '?', '?', '?'],
      ['?', '?', '?', '?'],
      ['?', '?', '?', '?'],
      ['?', '?', '?', '?']
    ]
  ]
])('make %s', (_, size, expected) =>
  expect(Board.make(size)).toStrictEqual(expected)
)

test('make invalid', () => expect(() => Board.make(-1)).toThrow())

test.each([
  ['0²', '', []],
  ['1² x', 'x', [['x']]],
  ['1² o', 'o', [['o']]],
  ['1² ?', '?', [['?']]],
  [
    '2²',
    `xo
     x?`,
    [
      ['x', 'o'],
      ['x', '?']
    ]
  ],
  [
    '3² ?',
    `???
     ???
     ???`,
    [
      ['?', '?', '?'],
      ['?', '?', '?'],
      ['?', '?', '?']
    ]
  ],
  [
    '3² xo?',
    `x??
     ?xo
     ?ox`,
    [
      ['x', '?', '?'],
      ['?', 'x', 'o'],
      ['?', 'o', 'x']
    ]
  ],
  [
    '4²',
    `x??o
     ?xo?
     ?ox?
     ???x`,
    [
      ['x', '?', '?', 'o'],
      ['?', 'x', 'o', '?'],
      ['?', 'o', 'x', '?'],
      ['?', '?', '?', 'x']
    ]
  ]
])('parse %s', (_, board, expected) =>
  expect(Board.parseDSL(board)).toStrictEqual(expected)
)

test.each([
  ['Invalid CellState', 'a'],
  ['Invalid length', 'xox']
])('parse %s', (_, board) => expect(() => Board.parseDSL(board)).toThrow())

test.each([
  [
    `???
     ???
     ???`,
    '?'
  ],
  [
    `???
     ?x?
     ???`,
    '?'
  ],
  [
    `???
     ?xo
     ???`,
    '?'
  ],
  [
    `?x?
     ?xo
     ???`,
    '?'
  ],
  [
    `?x?
     ?xo
     ??o`,
    '?'
  ],
  [
    `?x?
     ?xo
     ?xo`,
    'x'
  ]
])('getState step %#', (board, expected) =>
  expect(Board.getState(Board.parseDSL(board))).toStrictEqual(expected)
)

test('getState 0²', () => expect(Board.getState([])).toStrictEqual('?'))

test.each([
  [
    `xxx
     oo?
     ???`,
    'x'
  ],
  [
    `oo?
     xxx
     ???`,
    'x'
  ],
  [
    `oo?
     ???
     xxx`,
    'x'
  ],
  [
    `xo?
     xo?
     x??`,
    'x'
  ],
  [
    `ox?
     ox?
     ?x?`,
    'x'
  ],
  [
    `oox
     ??x
     ??x`,
    'x'
  ],
  [
    `xo?
     ox?
     ??x`,
    'x'
  ],
  [
    `oox
     ?x?
     x??`,
    'x'
  ]
])('getState 3² win %#', (board, expected) =>
  expect(Board.getState(Board.parseDSL(board))).toStrictEqual(expected)
)

test.each([
  [
    `xxxx
     ooo?
     ????
     ????`,
    'x'
  ],
  [
    `ooo?
     xxxx
     ????
     ????`,
    'x'
  ],
  [
    `ooo?
     ????
     xxxx
     ????`,
    'x'
  ],
  [
    `ooo?
     ????
     ????
     xxxx`,
    'x'
  ],
  [
    `xooo
     x???
     x???
     x???`,
    'x'
  ],
  [
    `oxoo
     ?x??
     ?x??
     ?x??`,
    'x'
  ],
  [
    `ooxo
     ??x?
     ??x?
     ??x?`,
    'x'
  ],
  [
    `ooox
     ???x
     ???x
     ???x`,
    'x'
  ],
  [
    `xooo
     ?x??
     ??x?
     ???x`,
    'x'
  ],
  [
    `ooox
     ??x?
     ?x??
     x???`,
    'x'
  ]
])('getState 4² win %#', (board, expected) =>
  expect(Board.getState(Board.parseDSL(board))).toStrictEqual(expected)
)

test.each(<const>[
  [
    'x',
    `???
     ???
     ???`,
    'x',
    1,
    1,
    `???
     ?x?
     ???`
  ],
  [
    'o',
    `???
     ?x?
     ???`,
    'o',
    2,
    0,
    `??o
     ?x?
     ???`
  ],
  [
    '?',
    `??o
     ?x?
     ???`,
    '?',
    2,
    0,
    `???
     ?x?
     ???`
  ]
])('mark %s', (_, boardDSL, cell, x, y, expected) => {
  const board = Board.parseDSL(boardDSL)
  Board.mark(board, cell, x, y)
  expect(board).toStrictEqual(Board.parseDSL(expected))
})

test.each(<const>[
  ['negative x', -1, 0],
  ['negative y', 0, -1],
  ['fractional x', 0.5, 0],
  ['fractional y', 0, 0.5],
  ['out-of-bounds x', 3, 0],
  ['out-of-bounds y', 0, 3]
])('mark %s', (_, x, y) =>
  expect(() => Board.mark(Board.make(), 'x', x, y)).toThrow()
)

test.each(<const>[
  ['0²', [], []],
  ['1² x', [['x']], [' x ']],
  ['1² o', [['o']], [' o ']],
  ['1² ?', [['?']], ['   ']],
  [
    '2²',
    [
      ['x', 'o'],
      ['x', '?']
    ],
    [
      // prettier-ignore
      '   ╷   ',
      ' x │ o ',
      '───┼───',
      ' x │   ',
      '   ╵   '
    ]
  ],
  [
    '3² ?',
    [
      ['?', '?', '?'],
      ['?', '?', '?'],
      ['?', '?', '?']
    ],
    [
      '   ╷   ╷   ',
      '   │   │   ',
      '───┼───┼───',
      '   │   │   ',
      '───┼───┼───',
      '   │   │   ',
      '   ╵   ╵   '
    ]
  ],
  [
    '3² xo?',
    [
      ['x', '?', '?'],
      ['?', 'x', 'o'],
      ['?', 'o', 'x']
    ],
    [
      '   ╷   ╷   ',
      ' x │   │   ',
      '───┼───┼───',
      '   │ x │ o ',
      '───┼───┼───',
      '   │ o │ x ',
      '   ╵   ╵   '
    ]
  ],
  [
    '4²',
    [
      ['x', '?', '?', 'o'],
      ['?', 'x', 'o', '?'],
      ['?', 'o', 'x', '?'],
      ['?', '?', '?', 'x']
    ],
    [
      '   ╷   ╷   ╷   ',
      ' x │   │   │ o ',
      '───┼───┼───┼───',
      '   │ x │ o │   ',
      '───┼───┼───┼───',
      '   │ o │ x │   ',
      '───┼───┼───┼───',
      '   │   │   │ x ',
      '   ╵   ╵   ╵   '
    ]
  ]
])('toString %s', (_, board, expected) =>
  expect(Board.toString(board)).toStrictEqual(expected.join('\n'))
)
