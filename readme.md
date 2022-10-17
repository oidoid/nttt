# \# nttt

n² Tic-Tac-Toe.

Models and functions for playing **tic-tac-toe** on an n-by-n (n²) grid.
Everything needed for managing game state.

## Installation

Add `https://deno.land/x/nttt/mod.ts` to your import modules.

## Usage

### Example

```ts
import * as nttt from 'https://deno.land/x/nttt/mod.ts';
const game = nttt.Game.make('x');
nttt.Game.mark(game, 1, 1);
console.log(nttt.Game.toString(game));
//    ╷   ╷
//    │   │
// ───┼───┼───
//    │ x │
// ───┼───┼───
//    │   │
//    ╵   ╵
```

Try the demo:

```bash
deno run https://deno.land/x/nttt/demo.ts
```

## Rules

A game for two. Each player is assigned a unique token, x's or o's.

### Objective

A player wins by marking a full row, column, or diagonal with their token. If
all cells on the board are filled without a winner, it is a cat's game or draw.

### Rules

Players take turns marking cells with token until the game concludes.

## [To-Do](to-do.text)

## References

- [Tic-Tac-Toe at Wikipedia](https://en.wikipedia.org/wiki/Tic-tac-toe)
- [m,n,k-game](https://en.wikipedia.org/wiki/M,n,k-game)

## License

© oidoid.

### AGPL-3.0-only

This program is free software: you can redistribute it and/or modify it under
the terms of the GNU Affero General Public License as published by the Free
Software Foundation, either version 3 of the License, or (at your option) any
later version.

This program is distributed in the hope that it will be useful, but WITHOUT ANY
WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A
PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License along
with this program. If not, see <https://www.gnu.org/licenses/>.
