/** A `Token` space or `Empty`. */
export type Cell = Parameters<typeof CellSet['has']>[0]

/** All possible states of a `Cell`. */
export const CellSet = new Set(['x', 'o', '?'] as const)

/**
 * Convert a domain-specific language string to a `Cell`. Whitespace is
 * stripped.
 *
 * Not the inverse of `toString`.
 *
 * @throws An `Error` is thrown for invalid DSL (empty or invalid character)
 *  that cannot be parsed.
 */
export function cellParseDSL(dsl: string): Cell {
  const trimmed = dsl.trim()
  if (cellIs(trimmed)) return trimmed
  throw Error(`"${dsl}" is not a Cell.`)
}

/** Test if string is a `Cell`. Whitespace-sensitive. */
export function cellIs(str: string): str is Cell {
  return CellSet.has(str as Cell)
}

/** Cell to string map. Mappings are a constant width of three characters. */
// to-do: use satisfies.
export const cellToString: Readonly<Record<Cell, string>> = {
  x: ' x ',
  o: ' o ',
  '?': '   ',
}
