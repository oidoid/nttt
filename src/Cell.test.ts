import { assertEquals, assertThrows } from 'std/testing/asserts.ts';
import { Cell } from './Cell.ts';

Deno.test('parseDSL()', async (test) => {
  for (
    const [dsl, expected] of [
      ['x', 'x'],
      ['o', 'o'],
      ['?', '?'],
      [' x', 'x'],
      ['o\n', 'o'],
      ['\t? ', '?'],
    ] as const
  ) {
    await test.step(
      `"${dsl}".`,
      () => assertEquals(Cell.parseDSL(dsl), expected),
    );
  }

  for (const [dsl] of [[''], ['X'], ['a']] as const) {
    await test.step(
      `"${dsl}".`,
      () => {
        assertThrows(() => Cell.parseDSL(dsl));
      },
    );
  }
});
