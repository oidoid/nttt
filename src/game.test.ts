import { assertEquals } from 'std/testing/asserts.ts'
import { Game } from '@/nttt'

Deno.test('reset', () => {
  const game = Game.make('x')

  Game.mark(game, 0, 0)
  Game.mark(game, 1, 0)
  Game.mark(game, 2, 0)
  Game.mark(game, 0, 1)
  Game.mark(game, 1, 1)
  Game.mark(game, 2, 1)
  Game.mark(game, 1, 2)
  Game.mark(game, 0, 2)
  Game.mark(game, 2, 2)

  Game.reset(game)
  assertEquals(game, Game.make('x'))
})
