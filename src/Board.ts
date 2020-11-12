import {Cell} from './Cell'
import {Empty, Token} from './Token'

/** An n² row-by-column grid of `Cell`s. */
export type Board = readonly Cell[][]

export namespace Board {
  /** The aggregated state of a `Board`. */
  export type State =
    // Token wins.
    | Token
    // Cat's game (draw). All spaces must be filled.
    | 'xo'
    // Incomplete.
    | Empty

  /** Create a new `Board` with sides of `size` `Cell`s in length. */
  export function make(size: number = 3): Board {
    if (size < 0) throw new Error('Nonnegative size required.')
    return makeSide(size).map(() => makeSide(size))
  }

  /**
   * Convert a DSL string to a `Board`. Whitespace is stripped. Throws an error
   * on invalid inputs.
   *
   * For example, the following string input:
   *
   * ```ts
   * `?x?
   *  ?xo
   *  ??o`
   * ```
   *
   * Produces the following Board output:
   *
   * ```ts
   * [
   *   ['?', 'x', '?'],
   *   ['?', 'x', 'o'],
   *   ['?', 'o', 'o']
   * ]
   * ```
   *
   * Not the inverse of `toString()`.
   */
  export function parseDSL(dsl: string): readonly Cell[][] {
    const cells = dsl.replace(/\s/g, '').split('').map(Cell.parseDSL)
    const size = Math.sqrt(cells.length)
    if (!Number.isInteger(size))
      throw new Error(`size=${size} is not an integer.`)
    return makeSide(size).map(() => cells.splice(0, size))
  }

  /**
   * Given two `State`s, map to their combined state. This is useful to sum
   * possibly mixed `State`s in a row, column, or `Board`. The operation is
   * commutative (orderless).
   */
  const aggregateState: Readonly<Record<
    State,
    Readonly<Record<State, State>>
  >> = {
    x: {x: 'x', o: 'xo', xo: 'xo', '?': '?'},
    o: {x: 'xo', o: 'o', xo: 'xo', '?': '?'},
    xo: {x: 'xo', o: 'xo', xo: 'xo', '?': '?'},
    '?': {x: '?', o: '?', xo: '?', '?': '?'}
  }

  /**
   * Calculate the `State` of the `Board`. When matching `Token`s fill a row,
   * column, or diagonal, that `Token` wins. When the `Board` is full but
   * there's no winner, it's a cat's game (draw). Otherwise, the game is
   * incomplete.
   *
   * This function assumes a valid `Board` and does not determine multiple
   * distinct winners.
   *
   * If the last move is known, it is possible to determine whether it was a
   * winning move by looking in its row and column, and as appropriate,
   * diagonals only instead of the whole board. However, this function considers
   * the whole `Board`.
   */
  export function getState(board: Readonly<Board>): State {
    const size = board.length
    if (!size) return '?'

    // The aggregated state of the entire `Board`. Usually `Empty` or cats.
    // `Token` is possible for special cases (one cell boards and invalid
    // boards).
    let boardState: State = board[0]![0]!

    // The aggregated state of each column.
    const columnState: State[] = [...board[0]!]

    // Check for horizontal lines and tally columns.
    for (let y = 0; y < size; y++) {
      let rowState: State = board[y]![0]!
      for (let x = 0; x < size; x++) {
        const cell = board[y]![x]!
        rowState = aggregateState[rowState]![cell]
        columnState[x] = aggregateState[columnState[x]!][cell]
        // In the case that `rowState` is `Empty`, subsequent `columnState`s
        // that are already `Empty` could be skipped. Large gaps of `Empty`'s
        // could exist but `Token` and cats columns will always need to be
        // checked and are more likely as `Token` population increases.
      }

      // Horizontal line test.
      if (rowState === 'x' || rowState === 'o') return rowState

      boardState = aggregateState[boardState]![rowState]
    }

    // Vertical line test.
    for (const column of columnState)
      if (column === 'x' || column === 'o') return column

    // Diagonal line test.
    let forward: State = board[0]![0]!
    let backward: State = board[0]![size - 1]!
    for (let i = 0; i < size; i++) {
      forward = aggregateState[forward]![board[i]![i]!]
      backward = aggregateState[backward]![board[i]![size - 1 - i]!]
    }
    if (forward === 'x' || forward === 'o') return forward
    if (backward === 'x' || backward === 'o') return backward

    return boardState
  }

  /**
   * Place a `Token` or `Empty` on the `Cell` at `Board[y][x]`. An error is
   * thrown for invalid or out-of-bounds `x` and `y`-coordinates.
   * zero-based position on the `Board` relative to the upper-left
   */
  export function mark(board: Board, cell: Cell, x: number, y: number): void {
    const size = board.length
    if (!(y in board))
      throw new Error(`y=${y} must be an integer less than size=${size}.`)
    if (!(x in board[y]!))
      throw new Error(`x=${x} must be an integer less than size=${size}.`)
    board[y]![x] = cell
  }

  /**
   * Convert a `Board` to a [Unicode string representation], usually across
   * multiple lines. `Board` width is constant meaning lines are likely to have
   * leading and trailing whitespace.
   *
   * Example (with trailing whitespace stripped):
   *
   * ```
   *    ╷   ╷
   *  x │   │
   * ───┼───┼───
   *    │ x │ o
   * ───┼───┼───
   *    │ o │ x
   *    ╵   ╵
   * ```
   *
   * See tests for special cases.
   *
   * [Unicode string representation]: https://en.wikipedia.org/wiki/Box_Drawing_(Unicode_block)
   */
  export function toString(board: readonly (readonly Cell[])[]): string {
    const size = board.length
    if (!size) return ''
    if (size === 1) return Cell.toString[board[0]![0]!]

    const top     = `${'   ╷'.repeat(size - 1)}   \n` // prettier-ignore
    const divider = `${'───┼'.repeat(size - 1)}───\n`
    const bottom  = `${'   ╵'.repeat(size - 1)}   ` // prettier-ignore

    const middle = board
      .map(row => `${row.map(cell => Cell.toString[cell]).join('│')}\n`)
      .join(divider)

    return top + middle + bottom
  }

  /** Create a new `Board` side initialized to `Empty`. */
  function makeSide(size: number): Empty[] {
    return Array<Empty>(size).fill('?')
  }
}
