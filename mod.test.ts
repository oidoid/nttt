import { XY } from '@/ooz'
import { assertEquals, assertThrows } from 'std/testing/asserts.ts'

/** API demonstration. */
import * as TicTacToe from './mod.ts'

// to-do: switch to inline snapshot tests.
Deno.test('3²', () => {
  const game = TicTacToe.Game('x')
  assertEquals(TicTacToe.gameGetState(game), '?')
  assertEquals(TicTacToe.gameGetSize(game), 3)
  //    ╷   ╷
  //    │   │
  // ───┼───┼───
  //    │   │
  // ───┼───┼───
  //    │   │
  //    ╵   ╵

  TicTacToe.gameMark(game, 1, 1)
  assertEquals(TicTacToe.gameGetState(game), '?')
  //    ╷   ╷
  //    │   │
  // ───┼───┼───
  //    │ x │
  // ───┼───┼───
  //    │   │
  //    ╵   ╵

  TicTacToe.gameMark(game, 1, 0)
  assertEquals(TicTacToe.gameGetState(game), '?')
  //    ╷   ╷
  //    │ o │
  // ───┼───┼───
  //    │ x │
  // ───┼───┼───
  //    │   │
  //    ╵   ╵

  TicTacToe.gameMark(game, 0, 0)
  assertEquals(TicTacToe.gameGetState(game), '?')
  //    ╷   ╷
  //  x │ o │
  // ───┼───┼───
  //    │ x │
  // ───┼───┼───
  //    │   │
  //    ╵   ╵

  TicTacToe.gameMark(game, 0, 2)
  assertEquals(TicTacToe.gameGetState(game), '?')
  //    ╷   ╷
  //  x │ o │
  // ───┼───┼───
  //    │ x │
  // ───┼───┼───
  //  o │   │
  //    ╵   ╵

  TicTacToe.gameMark(game, 2, 2)
  assertEquals(TicTacToe.gameGetState(game), 'x')
  //    ╷   ╷
  //  x │ o │
  // ───┼───┼───
  //    │ x │
  // ───┼───┼───
  //  o │   │ x
  //    ╵   ╵

  assertThrows(() => TicTacToe.gameMark(game, 0, 2))

  const undone = TicTacToe.gameUndo(game)
  assertEquals(undone, new XY(2, 2))
  assertEquals(TicTacToe.gameGetState(game), '?')
  //    ╷   ╷
  //  x │ o │
  // ───┼───┼───
  //    │ x │
  // ───┼───┼───
  //  o │   │
  //    ╵   ╵

  TicTacToe.gameMark(game, 1, 2)
  assertEquals(TicTacToe.gameGetState(game), '?') //    ╷   ╷
  //  x │ o │
  // ───┼───┼───
  //    │ x │
  // ───┼───┼───
  //  o │ x │
  //    ╵   ╵

  TicTacToe.gameMark(game, 2, 2)
  assertEquals(TicTacToe.gameGetState(game), '?')
  //    ╷   ╷
  //  x │ o │
  // ───┼───┼───
  //    │ x │
  // ───┼───┼───
  //  o │ x │ o
  //    ╵   ╵

  TicTacToe.gameMark(game, 2, 0)
  assertEquals(TicTacToe.gameGetState(game), '?')
  //    ╷   ╷
  //  x │ o │ x
  // ───┼───┼───
  //    │ x │
  // ───┼───┼───
  //  o │ x │ o
  //    ╵   ╵

  TicTacToe.gameMark(game, 0, 1)
  assertEquals(TicTacToe.gameGetState(game), '?')
  //    ╷   ╷
  //  x │ o │ x
  // ───┼───┼───
  //  o │ x │
  // ───┼───┼───
  //  o │ x │ o
  //    ╵   ╵

  TicTacToe.gameMark(game, 2, 1)
  assertEquals(TicTacToe.gameGetState(game), 'xo')
  //    ╷   ╷
  //  x │ o │ x
  // ───┼───┼───
  //  o │ x │ x
  // ───┼───┼───
  //  o │ x │ o
  //    ╵   ╵
})
