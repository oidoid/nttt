# \# [nttt](https://git.io/ntoes)

n² Tic-Tac-Toe.

## Table of Contents

<!-- @import "[TOC]" {cmd="toc" depthFrom=2 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [Table of Contents](#table-of-contents)
- [Installation and version history](#installation-and-version-history)
- [Usage](#usage)
  - [Example](#example)
- [Rules](#rules)
  - [Objective](#objective)
  - [Rules](#rules-1)
- [To-Do](#to-dotodomd)
- [References](#references)
- [License](#license)
  - [GPL-3.0-only](#gpl-30-only)

<!-- /code_chunk_output -->

## Installation and version history

Install the library:

```bash
npm i --save-prefix= nttt
```

See the [changelog](changelog.md) for release notes.

## Usage

### Example

```ts
const game = TicTacToe.Game.make('x')
TicTacToe.Game.mark(game, 1, 1)
console.log(TicTacToe.Board.toString(game.board))
//    ╷   ╷
//    │   │
// ───┼───┼───
//    │ x │
// ───┼───┼───
//    │   │
//    ╵   ╵
```

## Rules

A game for two. Each player is assigned a unique token, x's or o's.

### Objective

A player wins by marking a full row, column, or diagonal with their token. If
all cells on the board are filled without a winner, it is a cat's game or draw.

### Rules

Players take turns marking cells with token until the game concludes.

## [To-Do](todo.md)

## References

- [Tic-Tac-Toe at Wikipedia](https://en.wikipedia.org/wiki/Tic-tac-toe)
- [m,n,k-game](https://en.wikipedia.org/wiki/M,n,k-game)

## License

© Stephen Niedzielski.

### GPL-3.0-only

This program is free software: you can redistribute it and/or modify it under
the terms of the GNU General Public License as published by the Free Software
Foundation, version 3.

This program is distributed in the hope that it will be useful, but WITHOUT ANY
WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A
PARTICULAR PURPOSE. See the GNU General Public License for more details.

You should have received a copy of the GNU General Public License along with
this program. If not, see <https://www.gnu.org/licenses/>.
