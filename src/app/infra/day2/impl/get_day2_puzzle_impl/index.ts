import {
  GetDay2Part1PuzzleOuput, GetDay2Part2PuzzleOuput, GetDay2PuzzleError, RESULT, SHAPE
} from 'app-core/port/infra/storage/day2/dto/get-day2-puzzle';
import { createFail, createSuccess, Result } from 'common/interface/result';

type FIRST_INPUT = 'A' | 'B' | 'C';
type SECOND_INPUT = 'X' | 'Y' | 'Z';

const convertOpponentHand = (input: FIRST_INPUT): SHAPE => {
  switch (input) {
    case 'A': {
      return 'ROCK';
    }
    case 'B': {
      return 'PAPER';
    }
    case 'C': {
      return 'SCISSORS';
    }
    default: {
      throw new Error('Invalid input');
    }
  }
};

const convertOurHand = (input: SECOND_INPUT): SHAPE => {
  switch (input) {
    case 'X': {
      return 'ROCK';
    }
    case 'Y': {
      return 'PAPER';
    }
    case 'Z': {
      return 'SCISSORS';
    }
    default: {
      throw new Error('Invalid input');
    }
  }
};

const convertOurResult = (input: SECOND_INPUT): RESULT => {
  switch (input) {
    case 'X': {
      return 'LOOSE';
    }
    case 'Y': {
      return 'DRAW';
    }
    case 'Z': {
      return 'WIN';
    }
    default: {
      throw new Error('Invalid input');
    }
  }
};

export const getDay2Part1PuzzleImpl = async (textFile: string): Promise<Result<GetDay2Part1PuzzleOuput, GetDay2PuzzleError>> => {
  try {
    const lines = textFile.split('\n');

    const result = lines.map((line) => {
      const splitLine = line.split(' ');
      if (splitLine[0] && splitLine[1]) {
        const opponentHand = convertOpponentHand(splitLine[0] as FIRST_INPUT);
        const ourHand = convertOurHand(splitLine[1] as SECOND_INPUT);
        return {
          opponentHand,
          ourHand
        };
      }
      return null;
    }).flatMap((value) => (value === null ? [] : [value]));

    return createSuccess({ rounds: result });
  } catch {
    return createFail(null);
  }
};

export const getDay2Part2PuzzleImpl = async (textFile: string): Promise<Result<GetDay2Part2PuzzleOuput, GetDay2PuzzleError>> => {
  try {
    const lines = textFile.split('\n');

    const result = lines.map((line) => {
      const splitLine = line.split(' ');
      if (splitLine[0] && splitLine[1]) {
        const opponentHand = convertOpponentHand(splitLine[0] as FIRST_INPUT);
        const resultHand = convertOurResult(splitLine[1] as SECOND_INPUT);
        return {
          opponentHand,
          result: resultHand
        };
      }
      return null;
    }).flatMap((value) => (value === null ? [] : [value]));

    return createSuccess({ rounds: result });
  } catch {
    return createFail(null);
  }
};
