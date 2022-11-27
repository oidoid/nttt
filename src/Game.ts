import { NumberXY } from '@/oidlib';
import { Board, Token } from '@/nttt';

/** Everything needed  */
export interface Game {
  /**
   * The Tic-Tac-Toe `Board` state. For a three-by-three game, this looks like a
   * "#".
   */
  readonly board: Board;
  /** The `Token` awarded the first move. */
  readonly starting: Token;
  /** The moves taken so far from first to last. */
  readonly history: Readonly<NumberXY>[];
}

export namespace Game {
  /**
   * Create a new `Game` with `Board` sides of `size` `Cell`s in length. The
   * `starts` `Token` takes the first move.
   */
  export function make(starts: Token, size = 3): Game {
    return { board: Board.make(size), starting: starts, history: [] };
  }

  /** Reinitialize the `Game`. */
  export function reset(self: Game): void {
    for (const row of self.board) row.fill('?');
    self.history.length = 0;
  }

  /**
   * Returns the length of each side of the board in number of `Cells`, an
   * integer in the domain [0, +∞).
   */
  export function getSize(self: Game): number {
    return self.board.length;
  }

  export function getState(self: Game): Board.State {
    return Board.getState(self.board);
  }

  // getCell / isOccupied

  /** Return the current playing piece's turn. */
  export function getTurn(self: Game): Token {
    return self.history.length & 1 ? Token.next[self.starting] : self.starting;
  }

  /**
   * Place the current `Token` on the `Cell` at `Board[y][x]` and update the
   * turn.
   *
   * @throws An `Error` is thrown for invalid or out-of-bounds `x` and
   *  `y`-coordinates, when the game has already concluded, or when the `Cell`
   *  is occupied.
   */
  export function mark(self: Game, x: number, y: number): void {
    if (self.board[y]?.[x] != '?') throw Error('Cell occupied.');
    if (Board.getState(self.board) != '?') throw Error('Game over.');
    Board.mark(self.board, getTurn(self), x, y);
    self.history.push(NumberXY(x, y));
  }

  export function toString(self: Readonly<Game>): string {
    return Board.toString(self.board);
  }

  export function undo(self: Game): NumberXY | undefined {
    const position = self.history.pop();
    if (position) Board.mark(self.board, '?', position.x, position.y);
    return position;
  }
}
