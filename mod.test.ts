import { NumXY } from '@/oidlib'
import { assertEquals, assertThrows } from 'std/testing/asserts.ts'

/** API demonstration. */
import * as TicTacToe from './mod.ts'

// to-do: switch to inline snapshot tests.
Deno.test('3²', () => {
  const game = TicTacToe.Game.make('x')
  assertEquals(TicTacToe.Game.getState(game), '?')
  assertEquals(TicTacToe.Game.getSize(game), 3)
  //    ╷   ╷
  //    │   │
  // ───┼───┼───
  //    │   │
  // ───┼───┼───
  //    │   │
  //    ╵   ╵

  TicTacToe.Game.mark(game, 1, 1)
  assertEquals(TicTacToe.Game.getState(game), '?')
  //    ╷   ╷
  //    │   │
  // ───┼───┼───
  //    │ x │
  // ───┼───┼───
  //    │   │
  //    ╵   ╵

  TicTacToe.Game.mark(game, 1, 0)
  assertEquals(TicTacToe.Game.getState(game), '?')
  //    ╷   ╷
  //    │ o │
  // ───┼───┼───
  //    │ x │
  // ───┼───┼───
  //    │   │
  //    ╵   ╵

  TicTacToe.Game.mark(game, 0, 0)
  assertEquals(TicTacToe.Game.getState(game), '?')
  //    ╷   ╷
  //  x │ o │
  // ───┼───┼───
  //    │ x │
  // ───┼───┼───
  //    │   │
  //    ╵   ╵

  TicTacToe.Game.mark(game, 0, 2)
  assertEquals(TicTacToe.Game.getState(game), '?')
  //    ╷   ╷
  //  x │ o │
  // ───┼───┼───
  //    │ x │
  // ───┼───┼───
  //  o │   │
  //    ╵   ╵

  TicTacToe.Game.mark(game, 2, 2)
  assertEquals(TicTacToe.Game.getState(game), 'x')
  //    ╷   ╷
  //  x │ o │
  // ───┼───┼───
  //    │ x │
  // ───┼───┼───
  //  o │   │ x
  //    ╵   ╵

  assertThrows(() => TicTacToe.Game.mark(game, 0, 2))

  const undone = TicTacToe.Game.undo(game)
  assertEquals(undone, new NumXY(2, 2))
  assertEquals(TicTacToe.Game.getState(game), '?')
  //    ╷   ╷
  //  x │ o │
  // ───┼───┼───
  //    │ x │
  // ───┼───┼───
  //  o │   │
  //    ╵   ╵

  TicTacToe.Game.mark(game, 1, 2)
  assertEquals(TicTacToe.Game.getState(game), '?') //    ╷   ╷
  //  x │ o │
  // ───┼───┼───
  //    │ x │
  // ───┼───┼───
  //  o │ x │
  //    ╵   ╵

  TicTacToe.Game.mark(game, 2, 2)
  assertEquals(TicTacToe.Game.getState(game), '?')
  //    ╷   ╷
  //  x │ o │
  // ───┼───┼───
  //    │ x │
  // ───┼───┼───
  //  o │ x │ o
  //    ╵   ╵

  TicTacToe.Game.mark(game, 2, 0)
  assertEquals(TicTacToe.Game.getState(game), '?')
  //    ╷   ╷
  //  x │ o │ x
  // ───┼───┼───
  //    │ x │
  // ───┼───┼───
  //  o │ x │ o
  //    ╵   ╵

  TicTacToe.Game.mark(game, 0, 1)
  assertEquals(TicTacToe.Game.getState(game), '?')
  //    ╷   ╷
  //  x │ o │ x
  // ───┼───┼───
  //  o │ x │
  // ───┼───┼───
  //  o │ x │ o
  //    ╵   ╵

  TicTacToe.Game.mark(game, 2, 1)
  assertEquals(TicTacToe.Game.getState(game), 'xo')
  //    ╷   ╷
  //  x │ o │ x
  // ───┼───┼───
  //  o │ x │ x
  // ───┼───┼───
  //  o │ x │ o
  //    ╵   ╵
})
