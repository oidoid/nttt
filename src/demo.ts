import * as nttt from '@/nttt';

const game = nttt.Game.make('x');
nttt.Game.mark(game, 1, 1);
console.log(nttt.Game.toString(game));
