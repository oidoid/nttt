import {Cell} from './Cell'

test.each([
  ['x', 'x'],
  ['o', 'o'],
  ['?', '?'],
  [' x', 'x'],
  ['o\n', 'o'],
  ['\t? ', '?']
])('parseDSL "%s"', (dsl, expected) =>
  expect(Cell.parseDSL(dsl)).toStrictEqual(expected)
)

test.each([[''], ['X'], ['a']])('parseDSL "%s"', dsl =>
  expect(() => Cell.parseDSL(dsl)).toThrow()
)
