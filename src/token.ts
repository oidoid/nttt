/** The playing piece assigned to a player. */
export type Token = 'x' | 'o';
/** The absence of a `Token`. */
export type Empty = '?';

export namespace Token {
  /** Maps the current playing piece to the next in turn order. */
  export const next: Readonly<Record<Token, Token>> = { x: 'o', o: 'x' };
}
