import * as nttt from '@/nttt'

const game = nttt.Game('x')
nttt.gameMark(game, 1, 1)
console.log(nttt.gameToString(game))
