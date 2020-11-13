/** A `Token` space or `Empty`. */
export type Cell = typeof Cell.values[number]

export namespace Cell {
  /** All possible states of a `Cell`. */
  export const values = <const>['x', 'o', '?']

  /**
   * Convert a domain-specific language string to a `Cell`. Whitespace is
   * stripped.
   *
   * Not the inverse of `toString`.
   *
   * @throws An `Error` is thrown for invalid DSL (empty or invalid character)
   *  that cannot be parsed.
   */
  export function parseDSL(dsl: string): Cell {
    const trimmed = dsl.trim()
    if (is(trimmed)) return trimmed
    throw new Error(`"${dsl}" is not a Cell.`)
  }

  /** Test if string is a `Cell`. Whitespace-sensitive. */
  export function is(string: string): string is Cell {
    return (<readonly string[]>values).includes(string)
  }

  /** Cell to string map. Mappings are a constant width of three characters. */
  export const toString: Readonly<Record<Cell, string>> = {
    x: ' x ',
    o: ' o ',
    '?': '   '
  }
}
