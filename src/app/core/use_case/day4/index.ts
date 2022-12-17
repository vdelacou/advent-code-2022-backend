import { Day4Error } from 'app-core/port/api/day4/error';
import { Day4Response } from 'app-core/port/api/day4/response';
import { Day4Storage } from 'app-core/port/infra/storage/day4/puzzle-storage';
import { isFail } from 'common/interface/result';
import { UseCase } from '../../common/use-case';

export interface Day4UseCaseInject {
  day4Storage: Day4Storage;
}

const fullyContains = (firstArray: number[], secondArray: number[]): boolean => {
  const firstIncludeSecond = firstArray.every((first) => secondArray.includes(first));
  const secondIncludeSecond = secondArray.every((second) => firstArray.includes(second));
  return firstIncludeSecond || secondIncludeSecond;
};

const overlap = (firstArray: number[], secondArray: number[]): boolean => {
  const firstIncludeSecond = firstArray.some((first) => secondArray.includes(first));
  return firstIncludeSecond;
};

export const day4UseCasePart1: UseCase<null, Day4Response, Day4Error, Day4UseCaseInject> = async (_request, presenter, inject) => {
  const { presentFail, presentSuccess } = presenter;
  const { day4Storage } = inject;

  const day4StoragegetDay4PuzzleInputResult = await day4Storage.getDay4Part1Puzzle();

  if (isFail(day4StoragegetDay4PuzzleInputResult)) {
    return presentFail({ type: 'INFRA_ERROR' });
  }

  const { pair } = day4StoragegetDay4PuzzleInputResult.data;

  const priorityList = pair.map((pairItem) => {
    const { firstElfAssignment, secondElfAssignment } = pairItem;
    return fullyContains(firstElfAssignment, secondElfAssignment);
  });

  const result = priorityList.reduce((accumulator, current) => {
    if (current === true) {
      return accumulator + 1;
    }
    return accumulator;
  }, 0);

  return presentSuccess({ result });
};

export const day4UseCasePart2: UseCase<null, Day4Response, Day4Error, Day4UseCaseInject> = async (_request, presenter, inject) => {
  const { presentFail, presentSuccess } = presenter;
  const { day4Storage } = inject;

  const day4StoragegetDay4PuzzleInputResult = await day4Storage.getDay4Part1Puzzle();

  if (isFail(day4StoragegetDay4PuzzleInputResult)) {
    return presentFail({ type: 'INFRA_ERROR' });
  }

  const { pair } = day4StoragegetDay4PuzzleInputResult.data;

  const priorityList = pair.map((pairItem) => {
    const { firstElfAssignment, secondElfAssignment } = pairItem;
    return overlap(firstElfAssignment, secondElfAssignment);
  });

  const result = priorityList.reduce((accumulator, current) => {
    if (current === true) {
      return accumulator + 1;
    }
    return accumulator;
  }, 0);

  return presentSuccess({ result });
};
