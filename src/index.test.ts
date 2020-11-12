/** API demonstration. */
import * as TicTacToe from '.'

test('3²', () => {
  const game = TicTacToe.Game.make('x')
  expect(TicTacToe.Game.getState(game)).toStrictEqual('?')
  expect(TicTacToe.Game.getSize(game)).toStrictEqual(3)
  //    ╷   ╷
  //    │   │
  // ───┼───┼───
  //    │   │
  // ───┼───┼───
  //    │   │
  //    ╵   ╵

  TicTacToe.Game.mark(game, 1, 1)
  expect(TicTacToe.Game.getState(game)).toStrictEqual('?')
  //    ╷   ╷
  //    │   │
  // ───┼───┼───
  //    │ x │
  // ───┼───┼───
  //    │   │
  //    ╵   ╵

  TicTacToe.Game.mark(game, 1, 0)
  expect(TicTacToe.Game.getState(game)).toStrictEqual('?')
  //    ╷   ╷
  //    │ o │
  // ───┼───┼───
  //    │ x │
  // ───┼───┼───
  //    │   │
  //    ╵   ╵

  TicTacToe.Game.mark(game, 0, 0)
  expect(TicTacToe.Game.getState(game)).toStrictEqual('?')
  //    ╷   ╷
  //  x │ o │
  // ───┼───┼───
  //    │ x │
  // ───┼───┼───
  //    │   │
  //    ╵   ╵

  TicTacToe.Game.mark(game, 0, 2)
  expect(TicTacToe.Game.getState(game)).toStrictEqual('?')
  //    ╷   ╷
  //  x │ o │
  // ───┼───┼───
  //    │ x │
  // ───┼───┼───
  //  o │   │
  //    ╵   ╵

  TicTacToe.Game.mark(game, 2, 2)
  expect(TicTacToe.Game.getState(game)).toStrictEqual('x')
  //    ╷   ╷
  //  x │ o │
  // ───┼───┼───
  //    │ x │
  // ───┼───┼───
  //  o │   │ x
  //    ╵   ╵

  expect(() => TicTacToe.Game.mark(game, 0, 2)).toThrow()

  const undone = TicTacToe.Game.undo(game)
  expect(undone).toStrictEqual({x: 2, y: 2})
  expect(TicTacToe.Game.getState(game)).toStrictEqual('?')
  //    ╷   ╷
  //  x │ o │
  // ───┼───┼───
  //    │ x │
  // ───┼───┼───
  //  o │   │
  //    ╵   ╵

  TicTacToe.Game.mark(game, 1, 2)
  expect(TicTacToe.Game.getState(game)).toStrictEqual('?') //    ╷   ╷
  //  x │ o │
  // ───┼───┼───
  //    │ x │
  // ───┼───┼───
  //  o │ x │
  //    ╵   ╵

  TicTacToe.Game.mark(game, 2, 2)
  expect(TicTacToe.Game.getState(game)).toStrictEqual('?')
  //    ╷   ╷
  //  x │ o │
  // ───┼───┼───
  //    │ x │
  // ───┼───┼───
  //  o │ x │ o
  //    ╵   ╵

  TicTacToe.Game.mark(game, 2, 0)
  expect(TicTacToe.Game.getState(game)).toStrictEqual('?')
  //    ╷   ╷
  //  x │ o │ x
  // ───┼───┼───
  //    │ x │
  // ───┼───┼───
  //  o │ x │ o
  //    ╵   ╵

  TicTacToe.Game.mark(game, 0, 1)
  expect(TicTacToe.Game.getState(game)).toStrictEqual('?')
  //    ╷   ╷
  //  x │ o │ x
  // ───┼───┼───
  //  o │ x │
  // ───┼───┼───
  //  o │ x │ o
  //    ╵   ╵

  TicTacToe.Game.mark(game, 2, 1)
  expect(TicTacToe.Game.getState(game)).toStrictEqual('xo')
  //    ╷   ╷
  //  x │ o │ x
  // ───┼───┼───
  //  o │ x │ x
  // ───┼───┼───
  //  o │ x │ o
  //    ╵   ╵
})
