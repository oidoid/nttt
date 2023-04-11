import { Game, gameMark, gameReset } from '@/nttt'
import { assertEquals } from 'std/testing/asserts.ts'

Deno.test('reset', () => {
  const game = Game('x')

  gameMark(game, 0, 0)
  gameMark(game, 1, 0)
  gameMark(game, 2, 0)
  gameMark(game, 0, 1)
  gameMark(game, 1, 1)
  gameMark(game, 2, 1)
  gameMark(game, 1, 2)
  gameMark(game, 0, 2)
  gameMark(game, 2, 2)

  gameReset(game)
  assertEquals(game, Game('x'))
})
