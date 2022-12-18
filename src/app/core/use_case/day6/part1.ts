import { Day6Error } from 'app-core/port/api/day6/error';
import { Day6Response } from 'app-core/port/api/day6/response';
import { Day6Storage } from 'app-core/port/infra/storage/day6/puzzle-storage';
import { isFail } from 'common/interface/result';
import { UseCase } from '../../common/use-case';

export interface Day6UseCaseInject {
  day6Storage: Day6Storage;
}

const findIndex = (arrayBuffer: string[], numberDifference: number): number => {
  const nbrOfBuffer = arrayBuffer.length;
  const markers = [...Array.from({ length: nbrOfBuffer }).keys()].map((index) => arrayBuffer.slice(index, index + numberDifference));
  const index = markers.findIndex((marker) => {
    const uniqueLetters = new Set(marker);
    if (uniqueLetters.size === numberDifference) {
      return true;
    }
    return false;
  });
  return index + numberDifference;
};

export const day6UseCasePart1: UseCase<null, Day6Response, Day6Error, Day6UseCaseInject> = async (_request, presenter, inject) => {
  const { presentFail, presentSuccess } = presenter;
  const { day6Storage } = inject;

  const day6StoragegetDay6PuzzleInputResult = await day6Storage.getDay6Part1Puzzle();

  if (isFail(day6StoragegetDay6PuzzleInputResult)) {
    return presentFail({ type: 'INFRA_ERROR' });
  }

  const { buffer } = day6StoragegetDay6PuzzleInputResult.data;

  const arrayBuffer = [...buffer];

  const result = findIndex(arrayBuffer, 4);

  const resultPart2 = findIndex(arrayBuffer, 14);

  return presentSuccess({ result, resultPart2 });
};
