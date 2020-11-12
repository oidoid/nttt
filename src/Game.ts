import {Board} from './Board'
import {Token} from './Token'
import {XY} from './XY'

/** Everything needed  */
export type Game = Readonly<{
  /**
   * The Tic-Tac-Toe `Board` state. For a three-by-three game, this looks like a
   * "#".
   */
  board: Board
  /** The `Token` awarded the first move. */
  starting: Token
  /** The moves taken so far from first to last. */
  history: Readonly<XY>[]
}>

export namespace Game {
  /**
   * Create a new `Game` with `Board` sides of `size` `Cell`s in length. The
   * `starts` `Token` takes the first move.
   */
  export function make(starts: Token, size: number = 3): Game {
    return {board: Board.make(size), starting: starts, history: []}
  }

  /** Reinitialize the `Game`. */
  export function reset(game: Game): void {
    for (const row of game.board) row.fill('?')
    game.history.length = 0
  }

  /**
   * Returns the length of each side of the board in number of `Cells`, an
   * integer in the domain [0, +∞).
   */
  export function getSize(game: Game): number {
    return game.board.length
  }

  export function getState(game: Game): Board.State {
    return Board.getState(game.board)
  }

  // getCell / isOccupied

  /** Return the current playing piece's turn. */
  export function getTurn(game: Game): Token {
    return game.history.length & 1 ? Token.next[game.starting] : game.starting
  }

  /**
   * Place the current `Token` on the `Cell` at `Board[y][x]` and update the
   * turn. An error is thrown for invalid or out-of-bounds `x` and
   * `y`-coordinates, when the game has already concluded, or when the `Cell` is
   * occupied.
   */
  export function mark(game: Game, x: number, y: number): void {
    if (game.board[y]?.[x] !== '?') throw new Error('Cell occupied.')
    if (Board.getState(game.board) !== '?') throw new Error('Game over.')
    Board.mark(game.board, getTurn(game), x, y)
    game.history.push({x, y})
  }

  export function undo(game: Game): XY | undefined {
    const position = game.history.pop()
    if (position) Board.mark(game.board, '?', position.x, position.y)
    return position
  }
}
