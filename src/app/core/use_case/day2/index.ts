import { Day2Error } from 'app-core/port/api/day2/error';
import { Day2Response } from 'app-core/port/api/day2/response';
import { Day2Storage } from 'app-core/port/infra/storage/day2/day2-storage';
import { RESULT, SHAPE } from 'app-core/port/infra/storage/day2/dto/get-day2-puzzle';
import { isFail } from 'common/interface/result';
import { UseCase } from '../../common/use-case';

const getScoreShapeSelected = (shapeSelected: SHAPE): number => {
  const score = new Map<SHAPE, number>([['ROCK', 1], ['PAPER', 2]]);
  return score.get(shapeSelected) || 3;
};

const getResult = (ourHand: SHAPE, opponentHand: SHAPE): RESULT => {
  if (ourHand === opponentHand) {
    return 'DRAW';
  }
  const resultWin = new Map<SHAPE, SHAPE>(
    [
      ['PAPER', 'ROCK'],
      ['ROCK', 'SCISSORS'],
      ['SCISSORS', 'PAPER']
    ]
  );
  return resultWin.get(ourHand) === opponentHand ? 'WIN' : 'LOOSE';
};

const getHandAccordingToResult = (opponentHand: SHAPE, expectedResult: RESULT): SHAPE => {
  const allShape: SHAPE[] = ['ROCK', 'PAPER', 'SCISSORS'];
  const result = allShape.map((ourHand) => {
    if (getResult(ourHand, opponentHand) === expectedResult) {
      return ourHand;
    }
    return null;
  }).flatMap((value) => (value ? [value] : []));
  return result[0];
};

const getScoreResult = (result: RESULT): number => {
  const score = new Map<RESULT, number>([['WIN', 6], ['DRAW', 3]]);
  return score.get(result) || 0;
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
