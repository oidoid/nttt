import { Cell, Empty, Token } from '@/nttt'
import { assert } from '@/oidlib'

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

  /**
   * Create a new `Board` with sides of `size` `Cell`s in length.
   * @arg size An integer in the domain [0, +∞).
   * @throws An `Error` is thrown for negative sizes.
   */
  export function make(size = 3): Board {
    assert(size >= 0, 'Nonnegative size required.')
    return makeSide(size).map(() => makeSide(size))
  }

  /**
   * Convert a domain-specific language string to a `Board`. Whitespace is
   * stripped.
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
   *
   * @throws An `Error` is thrown for invalid DSL that cannot be parsed.
   */
  export function parseDSL(dsl: string): readonly Cell[][] {
    const cells = dsl.replace(/\s/g, '').split('').map(Cell.parseDSL)
    const size = Math.sqrt(cells.length)
    assert(Number.isInteger(size), `size=${size} is not an integer.`)
    return makeSide(size).map(() => cells.splice(0, size))
  }

  /**
   * Given two `State`s, map to their combined state. This is useful to sum
   * possibly mixed `State`s in a row, column, or `Board`. The operation is
   * commutative (orderless).
   */
  const aggregateState: Readonly<
    Record<State, Readonly<Record<State, State>>>
  > = {
    x: { x: 'x', o: 'xo', xo: 'xo', '?': '?' },
    o: { x: 'xo', o: 'o', xo: 'xo', '?': '?' },
    xo: { x: 'xo', o: 'xo', xo: 'xo', '?': '?' },
    '?': { x: '?', o: '?', xo: '?', '?': '?' },
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
  export function getState(self: Readonly<Board>): State {
    const size = self.length
    if (!size) return '?'

    // The aggregated state of the entire `Board`. Usually `Empty` or cats.
    // `Token` is possible for special cases (one cell boards and invalid
    // boards).
    let boardState: State = self[0]![0]!

    // The aggregated state of each column.
    const columnState: State[] = [...self[0]!]

    // Check for horizontal lines and tally columns.
    for (let y = 0; y < size; y++) {
      let rowState: State = self[y]![0]!
      for (let x = 0; x < size; x++) {
        const cell = self[y]![x]!
        rowState = aggregateState[rowState]![cell]
        columnState[x] = aggregateState[columnState[x]!][cell]
        // In the case that `rowState` is `Empty`, subsequent `columnState`s
        // that are already `Empty` could be skipped. Large gaps of `Empty`'s
        // could exist but `Token` and cats columns will always need to be
        // checked and are more likely as `Token` population increases.
      }

      // Horizontal line test.
      if (rowState == 'x' || rowState == 'o') return rowState

      boardState = aggregateState[boardState]![rowState]
    }

    // Vertical line test.
    for (const column of columnState) {
      if (column == 'x' || column == 'o') return column
    }

    // Diagonal line test.
    let forward: State = self[0]![0]!
    let backward: State = self[0]![size - 1]!
    for (let i = 0; i < size; i++) {
      forward = aggregateState[forward]![self[i]![i]!]
      backward = aggregateState[backward]![self[i]![size - 1 - i]!]
    }
    if (forward == 'x' || forward == 'o') return forward
    if (backward == 'x' || backward == 'o') return backward

    return boardState
  }

  /**
   * Place a `Token` or `Empty` on the `Cell` at `Board[y][x]`. `x` and `y` are
   * positions in the domain [0, size) relative to the `Board`'s upper-left.
   *
   * @throws An `Error` is thrown for invalid or out-of-bounds `x` and
   *  `y`-coordinates.
   */
  export function mark(self: Board, cell: Cell, x: number, y: number): void {
    const size = self.length
    assert(y in self, `y=${y} must be an integer less than size=${size}.`)
    assert(x in self[y]!, `x=${x} must be an integer less than size=${size}.`)
    self[y]![x] = cell
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
  export function toString(self: readonly (readonly Cell[])[]): string {
    const size = self.length
    if (!size) return ''
    if (size == 1) return Cell.toString[self[0]![0]!]

    const top = `${'   ╷'.repeat(size - 1)}   \n`
    const divider = `${'───┼'.repeat(size - 1)}───\n`
    const bottom = `${'   ╵'.repeat(size - 1)}   `

    const middle = self
      .map((row) => `${row.map((cell) => Cell.toString[cell]).join('│')}\n`)
      .join(divider)

    return top + middle + bottom
  }

  /**
   * Create a new `Board` side initialized to `Empty`.
   * @arg size An integer in the domain [0, +∞).
   */
  function makeSide(size: number): Empty[] {
    return Array<Empty>(size).fill('?')
  }
}
