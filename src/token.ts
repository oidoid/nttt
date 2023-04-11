/** The playing piece assigned to a player. */
export type Token = 'x' | 'o'
/** The absence of a `Token`. */
export type Empty = '?'

/** Maps the current playing piece to the next in turn order. */
export const nextToken: Readonly<Record<Token, Token>> = { x: 'o', o: 'x' }
