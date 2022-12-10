import { Day1Error } from 'app-core/port/api/day1/error';
import { Day1Response } from 'app-core/port/api/day1/response';
import { Day1Storage } from 'app-core/port/infra/storage/day1/day1-storage';
import { isFail } from 'common/interface/result';
import { UseCase } from '../../common/use-case';

export interface Day1UseCaseInject {
  day1Storage: Day1Storage;
}

export const day1UseCase: UseCase<null, Day1Response, Day1Error, Day1UseCaseInject> = async (_request, presenter, inject) => {
  const { presentFail, presentSuccess } = presenter;
  const { day1Storage } = inject;

  const day1StoragegetDay1PuzzleInputResult = await day1Storage.getDay1Puzzle();

  if (isFail(day1StoragegetDay1PuzzleInputResult)) {
    return presentFail({ type: 'INFRA_ERROR' });
  }

  return presentSuccess({ mostCalories: 1 });
};
