import {
  Board,
  boardGetState,
  boardMark,
  BoardState,
  boardToString,
  nextToken,
  Token,
} from '@/nttt'
import { assert, XY } from '@/ooz'

/** Everything needed  */
export interface Game {
  /**
   * The Tic-Tac-Toe `Board` state. For a three-by-three game, this looks like a
   * "#".
   */
  readonly board: Board
  /** The `Token` awarded the first move. */
  readonly starting: Token
  /** The moves taken so far from first to last. */
  readonly history: Readonly<XY>[]
}

/**
 * Create a new `Game` with `Board` sides of `size` `Cell`s in length. The
 * `starts` `Token` takes the first move.
 */
export function Game(starts: Token, size = 3): Game {
  return { board: Board(size), starting: starts, history: [] }
}

/** Reinitialize the `Game`. */
export function gameReset(self: Game): void {
  for (const row of self.board) row.fill('?')
  self.history.length = 0
}

/**
 * Returns the length of each side of the board in number of `Cells`, an
 * integer in the domain [0, +∞).
 */
export function gameGetSize(self: Game): number {
  return self.board.length
}

export function gameGetState(self: Game): BoardState {
  return boardGetState(self.board)
}

// getCell / isOccupied

/** Return the current playing piece's turn. */
export function gameGetTurn(self: Game): Token {
  return self.history.length & 1 ? nextToken[self.starting] : self.starting
}

/**
 * Place the current `Token` on the `Cell` at `Board[y][x]` and update the
 * turn.
 *
 * @throws An `Error` is thrown for invalid or out-of-bounds `x` and
 *  `y`-coordinates, when the game has already concluded, or when the `Cell`
 *  is occupied.
 */
export function gameMark(self: Game, x: number, y: number): void {
  assert(self.board[y]?.[x] === '?', 'Cell occupied.')
  assert(boardGetState(self.board) === '?', 'Game over.')
  boardMark(self.board, gameGetTurn(self), x, y)
  self.history.push(new XY(x, y))
}

export function gameToString(self: Readonly<Game>): string {
  return boardToString(self.board)
}

export function gameUndo(self: Game): Readonly<XY> | undefined {
  const position = self.history.pop()
  if (position) boardMark(self.board, '?', position.x, position.y)
  return position
}
