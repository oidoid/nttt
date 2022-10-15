import { assertEquals, assertThrows } from 'std/testing/asserts.ts';
import { Board } from './Board.ts';

Deno.test('make()', async (test) => {
  for (
    const [name, size, expected] of [
      ['0²', 0, []],
      ['1²', 1, [['?']]],
      [
        '2²',
        2,
        [
          ['?', '?'],
          ['?', '?'],
        ],
      ],
      [
        '3² (default)',
        3,
        [
          ['?', '?', '?'],
          ['?', '?', '?'],
          ['?', '?', '?'],
        ],
      ],
      [
        '4²',
        4,
        [
          ['?', '?', '?', '?'],
          ['?', '?', '?', '?'],
          ['?', '?', '?', '?'],
          ['?', '?', '?', '?'],
        ],
      ],
    ] as const
  ) {
    await test.step(`make ${name}.`, () =>
      assertEquals(Board.make(size), expected as Board));
  }

  await test.step('make invalid', () => {
    assertThrows(() => Board.make(-1));
  });
});

Deno.test('parseDSL()', async (test) => {
  for (
    const [name, board, expected] of [
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
          ['x', '?'],
        ],
      ],
      [
        '3² ?',
        `???
         ???
         ???`,
        [
          ['?', '?', '?'],
          ['?', '?', '?'],
          ['?', '?', '?'],
        ],
      ],
      [
        '3² xo?',
        `x??
         ?xo
         ?ox`,
        [
          ['x', '?', '?'],
          ['?', 'x', 'o'],
          ['?', 'o', 'x'],
        ],
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
          ['?', '?', '?', 'x'],
        ],
      ],
    ] as const
  ) {
    await test.step(`Parse ${name}.`, () =>
      assertEquals(Board.parseDSL(board), expected as Board));
  }

  for (
    const [name, board] of [
      ['Invalid CellState', 'a'],
      ['Invalid length', 'xox'],
    ] as const
  ) {
    await test.step(`Parse ${name}.`, () => {
      assertThrows(() => Board.parseDSL(board));
    });
  }
});

Deno.test('getState()', async (test) => {
  for (
    const [index, [board, expected]] of ([
      [
        `???
         ???
         ???`,
        '?',
      ],
      [
        `???
         ?x?
         ???`,
        '?',
      ],
      [
        `???
         ?xo
         ???`,
        '?',
      ],
      [
        `?x?
         ?xo
         ???`,
        '?',
      ],
      [
        `?x?
         ?xo
         ??o`,
        '?',
      ],
      [
        `?x?
         ?xo
         ?xo`,
        'x',
      ],
    ] as const).entries()
  ) {
    await test.step(`Step ${index}.`, () =>
      assertEquals(Board.getState(Board.parseDSL(board)), expected));
  }

  await test.step('getState 0²', () => assertEquals(Board.getState([]), '?'));

  for (
    const [index, [board, expected]] of ([
      [
        `xxx
         oo?
         ???`,
        'x',
      ],
      [
        `oo?
         xxx
         ???`,
        'x',
      ],
      [
        `oo?
         ???
         xxx`,
        'x',
      ],
      [
        `xo?
         xo?
         x??`,
        'x',
      ],
      [
        `ox?
         ox?
         ?x?`,
        'x',
      ],
      [
        `oox
         ??x
         ??x`,
        'x',
      ],
      [
        `xo?
         ox?
         ??x`,
        'x',
      ],
      [
        `oox
         ?x?
         x??`,
        'x',
      ],
    ] as const).entries()
  ) {
    await test.step(`getState 3² win ${index}.`, () =>
      assertEquals(Board.getState(Board.parseDSL(board)), expected));
  }

  for (
    const [index, [board, expected]] of ([
      [
        `xxxx
         ooo?
         ????
         ????`,
        'x',
      ],
      [
        `ooo?
         xxxx
         ????
         ????`,
        'x',
      ],
      [
        `ooo?
         ????
         xxxx
         ????`,
        'x',
      ],
      [
        `ooo?
         ????
         ????
         xxxx`,
        'x',
      ],
      [
        `xooo
         x???
         x???
         x???`,
        'x',
      ],
      [
        `oxoo
         ?x??
         ?x??
         ?x??`,
        'x',
      ],
      [
        `ooxo
         ??x?
         ??x?
         ??x?`,
        'x',
      ],
      [
        `ooox
         ???x
         ???x
         ???x`,
        'x',
      ],
      [
        `xooo
         ?x??
         ??x?
         ???x`,
        'x',
      ],
      [
        `ooox
         ??x?
         ?x??
         x???`,
        'x',
      ],
    ] as const).entries()
  ) {
    await test.step(`getState 4² win ${index}.`, () =>
      assertEquals(Board.getState(Board.parseDSL(board)), expected));
  }
});

Deno.test('mark()', async (test) => {
  for (
    const [name, boardDSL, cell, x, y, expected] of [
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
         ???`,
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
         ???`,
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
         ???`,
      ],
    ] as const
  ) {
    await test.step(`mark ${name}.`, () => {
      const board = Board.parseDSL(boardDSL);
      Board.mark(board, cell, x, y);
      assertEquals(board, Board.parseDSL(expected));
    });
  }

  for (
    const [name, x, y] of [
      ['negative x', -1, 0],
      ['negative y', 0, -1],
      ['fractional x', 0.5, 0],
      ['fractional y', 0, 0.5],
      ['out-of-bounds x', 3, 0],
      ['out-of-bounds y', 0, 3],
    ] as const
  ) {
    await test.step(
      `mark ${name},`,
      () => {
        assertThrows(() => Board.mark(Board.make(), 'x', x, y));
      },
    );
  }
});

Deno.test('toString()', async (test) => {
  for (
    const [name, board, expected] of [
      ['0²', [], []],
      ['1² x', [['x']], [' x ']],
      ['1² o', [['o']], [' o ']],
      ['1² ?', [['?']], ['   ']],
      [
        '2²',
        [
          ['x', 'o'],
          ['x', '?'],
        ],
        [
          '   ╷   ',
          ' x │ o ',
          '───┼───',
          ' x │   ',
          '   ╵   ',
        ],
      ],
      [
        '3² ?',
        [
          ['?', '?', '?'],
          ['?', '?', '?'],
          ['?', '?', '?'],
        ],
        [
          '   ╷   ╷   ',
          '   │   │   ',
          '───┼───┼───',
          '   │   │   ',
          '───┼───┼───',
          '   │   │   ',
          '   ╵   ╵   ',
        ],
      ],
      [
        '3² xo?',
        [
          ['x', '?', '?'],
          ['?', 'x', 'o'],
          ['?', 'o', 'x'],
        ],
        [
          '   ╷   ╷   ',
          ' x │   │   ',
          '───┼───┼───',
          '   │ x │ o ',
          '───┼───┼───',
          '   │ o │ x ',
          '   ╵   ╵   ',
        ],
      ],
      [
        '4²',
        [
          ['x', '?', '?', 'o'],
          ['?', 'x', 'o', '?'],
          ['?', 'o', 'x', '?'],
          ['?', '?', '?', 'x'],
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
          '   ╵   ╵   ╵   ',
        ],
      ],
    ] as const
  ) {
    await test.step(`toString ${name}.`, () =>
      assertEquals(Board.toString(board), expected.join('\n')));
  }
});
