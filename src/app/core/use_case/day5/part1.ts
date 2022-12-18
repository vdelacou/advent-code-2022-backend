import { Day5Error } from 'app-core/port/api/day5/error';
import { Day5Response } from 'app-core/port/api/day5/response';
import { Day5Storage } from 'app-core/port/infra/storage/day5/puzzle-storage';
import { isFail } from 'common/interface/result';
import { UseCase } from '../../common/use-case';

export interface Day5UseCaseInject {
  day5Storage: Day5Storage;
}

export const day5UseCasePart1: UseCase<null, Day5Response, Day5Error, Day5UseCaseInject> = async (_request, presenter, inject) => {
  const { presentFail, presentSuccess } = presenter;
  const { day5Storage } = inject;

  const day5StoragegetDay5PuzzleInputResult = await day5Storage.getDay5Part1Puzzle();

  if (isFail(day5StoragegetDay5PuzzleInputResult)) {
    return presentFail({ type: 'INFRA_ERROR' });
  }

  const { stacks, moves } = day5StoragegetDay5PuzzleInputResult.data;

  moves.forEach((move) => {
    const findStackToMoveFrom = stacks.find((stack) => stack.number === move.fromIndex);
    const findStackToMoveTo = stacks.find((stack) => stack.number === move.toIndex);
    if (findStackToMoveFrom && findStackToMoveTo) {
      [...Array.from({ length: move.numberToMove }).keys()].forEach(() => {
        findStackToMoveTo.crates.unshift(findStackToMoveFrom.crates[0]);
        findStackToMoveFrom.crates.shift();
      });
    }
  });

  const result = stacks.map((stack) => stack.crates[0]).join('');

  return presentSuccess({ result });
};
