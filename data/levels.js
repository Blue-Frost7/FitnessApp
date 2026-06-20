// data/levels.js

export const RANKS = {
  IRON: {
    level: 1, name: 'Iron', minLevel: 1, maxLevel: 14,
    color: '#0099FF', nextRank: 'TUSK',
    character: 'General Iron',
    quote: 'Every rep brings you closer to greatness!'
  },
  TUSK: {
    level: 2, name: 'Tusk', minLevel: 15, maxLevel: 34,
    color: '#0066FF', nextRank: 'BERU',
    character: 'General Tusk',
    quote: 'Pain is weakness leaving your body!'
  },
  BERU: {
    level: 3, name: 'Beru', minLevel: 35, maxLevel: 49,
    color: '#3344FF', nextRank: 'IGRIS',
    character: 'Marshal Beru',
    quote: 'Demons fear those who never quit!'
  },
  IGRIS: {
    level: 4, name: 'Igris', minLevel: 50, maxLevel: 79,
    color: '#6633FF', nextRank: 'BELLION',
    character: 'Grand Marshal Igris',
    quote: 'Beasts bow to the strong!'
  },
  BELLION: {
    level: 5, name: 'Bellion', minLevel: 80, maxLevel: 99,
    color: '#9900FF', nextRank: 'MONARCH',
    character: 'Grand Marshal Bellion',
    quote: 'Frost yields to those with will!'
  },
  MONARCH: {
    level: 6, name: 'Shadow Monarch', minLevel: 100, maxLevel: 100,
    color: '#FF00FF', nextRank: null,
    character: 'Shadow Monarch',
    quote: 'You are the master of your destiny!'
  }
};

export function getRankByLevel(userLevel) {
  for (let rank of Object.values(RANKS)) {
    if (userLevel >= rank.minLevel && userLevel <= rank.maxLevel) {
      return rank;
    }
  }
  return RANKS.IRON;
}

export function getColorByLevel(userLevel) {
  const colors = [
    '#0099FF', '#0066FF', '#3344FF',
    '#6633FF', '#9900FF', '#FF00FF'
  ];
  const rank = getRankByLevel(userLevel);
  return rank.color;
}