import { Day2Error } from 'app-core/port/api/day2/error';
import { Day2Response } from 'app-core/port/api/day2/response';
import { Day2Storage } from 'app-core/port/infra/storage/day2/day2-storage';
import { RESULT, SHAPE } from 'app-core/port/infra/storage/day2/dto/get-day2-puzzle';
import { isFail } from 'common/interface/result';
import { UseCase } from '../../common/use-case';

const getHandAccordingToResult = (opponentHand: SHAPE, expectedResult: RESULT): SHAPE => {
  if (opponentHand === 'PAPER' && expectedResult === 'WIN') {
    return 'SCISSORS';
  }
  if (opponentHand === 'PAPER' && expectedResult === 'LOOSE') {
    return 'ROCK';
  }
  if (opponentHand === 'ROCK' && expectedResult === 'WIN') {
    return 'PAPER';
  }
  if (opponentHand === 'ROCK' && expectedResult === 'LOOSE') {
    return 'SCISSORS';
  }
  if (opponentHand === 'SCISSORS' && expectedResult === 'WIN') {
    return 'ROCK';
  }
  if (opponentHand === 'SCISSORS' && expectedResult === 'LOOSE') {
    return 'PAPER';
  }
  return opponentHand;
};

const getScoreShapeSelected = (shapeSelected: SHAPE): number => {
  switch (shapeSelected) {
    case 'ROCK': {
      return 1;
    }
    case 'PAPER': {
      return 2;
    }
    // SCISSORS
    default: {
      return 3;
    }
  }
};

const getResult = (ourHand: SHAPE, opponentHand: SHAPE): RESULT => {
  if (ourHand === 'PAPER' && opponentHand === 'ROCK') {
    return 'WIN';
  }
  if (ourHand === 'PAPER' && opponentHand === 'SCISSORS') {
    return 'LOOSE';
  }
  if (ourHand === 'ROCK' && opponentHand === 'SCISSORS') {
    return 'WIN';
  }
  if (ourHand === 'ROCK' && opponentHand === 'PAPER') {
    return 'LOOSE';
  }
  if (ourHand === 'SCISSORS' && opponentHand === 'PAPER') {
    return 'WIN';
  }
  if (ourHand === 'SCISSORS' && opponentHand === 'ROCK') {
    return 'LOOSE';
  }
  return 'DRAW';
};

const getScoreResult = (result: RESULT): number => {
  switch (result) {
    case 'WIN': {
      return 6;
    }
    case 'LOOSE': {
      return 0;
    }
    // DRAW
    default: {
      return 3;
    }
  }
};

export interface Day2UseCaseInject {
  day2Storage: Day2Storage;
}

export const day2UseCasePart1: UseCase<null, Day2Response, Day2Error, Day2UseCaseInject> = async (_request, presenter, inject) => {
  const { presentFail, presentSuccess } = presenter;
  const { day2Storage } = inject;

  const day2StoragegetDay2PuzzleInputResult = await day2Storage.getDay2Part1Puzzle();

  if (isFail(day2StoragegetDay2PuzzleInputResult)) {
    return presentFail({ type: 'INFRA_ERROR' });
  }

  const scoreList = day2StoragegetDay2PuzzleInputResult.data.rounds.map((round) => {
    const scoreShapeSelected = getScoreShapeSelected(round.ourHand);
    const result = getResult(round.ourHand, round.opponentHand);
    const scoreResult = getScoreResult(result);
    return scoreShapeSelected + scoreResult;
  });

  const score = scoreList.reduce((accumulator, current) => accumulator + current, 0);

  return presentSuccess({ score });
};

export const day2UseCasePart2: UseCase<null, Day2Response, Day2Error, Day2UseCaseInject> = async (_request, presenter, inject) => {
  const { presentFail, presentSuccess } = presenter;
  const { day2Storage } = inject;

  const day2StoragegetDay2PuzzleInputResult = await day2Storage.getDay2Part2Puzzle();

  if (isFail(day2StoragegetDay2PuzzleInputResult)) {
    return presentFail({ type: 'INFRA_ERROR' });
  }

  const scoreList = day2StoragegetDay2PuzzleInputResult.data.rounds.map((round) => {
    const ourHand = getHandAccordingToResult(round.opponentHand, round.result);
    const scoreShapeSelected = getScoreShapeSelected(ourHand);
    const result = getResult(ourHand, round.opponentHand);
    const scoreResult = getScoreResult(result);
    return scoreShapeSelected + scoreResult;
  });

  const score = scoreList.reduce((accumulator, current) => accumulator + current, 0);

  return presentSuccess({ score });
};
