export type SHAPE = 'PAPER' | 'ROCK' | 'SCISSORS';
export type RESULT = 'WIN' | 'LOOSE' | 'DRAW';

export interface GetDay2Part1PuzzleOuput {
  rounds: {
    opponentHand: SHAPE;
    ourHand: SHAPE;
  }[]
}

export interface GetDay2Part2PuzzleOuput {
  rounds: {
    opponentHand: SHAPE;
    result: RESULT;
  }[]
}

export type GetDay2PuzzleError = null
