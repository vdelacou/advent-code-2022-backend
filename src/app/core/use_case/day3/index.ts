import { Day3Error } from 'app-core/port/api/day3/error';
import { Day3Response } from 'app-core/port/api/day3/response';
import { Character, UPPER_CASE_CHARACTER } from 'app-core/port/infra/storage/day3/dto/get-input-puzzle';
import { Day3Storage } from 'app-core/port/infra/storage/day3/puzzle-storage';
import { isFail } from 'common/interface/result';
import { UseCase } from '../../common/use-case';

const getPriorityMap = (): Map<string, number> => {
  const map = new Map<string, number>();
  const allLetters = [...UPPER_CASE_CHARACTER.map((char) => char.toLowerCase()), ...UPPER_CASE_CHARACTER];
  allLetters.forEach((char, index) => {
    map.set(char, index + 1);
  });
  return map;
};

const computePriority = (char: Character): number => getPriorityMap().get(char) || 0;

export interface Day3UseCaseInject {
  day3Storage: Day3Storage;
}

export const day3UseCasePart1: UseCase<null, Day3Response, Day3Error, Day3UseCaseInject> = async (_request, presenter, inject) => {
  const { presentFail, presentSuccess } = presenter;
  const { day3Storage } = inject;

  const day3StoragegetDay3PuzzleInputResult = await day3Storage.getDay3Part1Puzzle();

  if (isFail(day3StoragegetDay3PuzzleInputResult)) {
    return presentFail({ type: 'INFRA_ERROR' });
  }

  const { rucksacks } = day3StoragegetDay3PuzzleInputResult.data;

  const priorityList = rucksacks.map((rucksack) => {
    const { firstCompartment, secondCompartment } = rucksack;

    const sameItemList = firstCompartment.filter((itemFirstComp) => secondCompartment.some((itemSecondComp) => itemFirstComp.itemName === itemSecondComp.itemName));
    const uniquesSmeItemList = [...new Map(sameItemList.map((item) => [item.itemName, item])).values()];
    const sumPriority = uniquesSmeItemList[0]?.itemName;
    return computePriority(sumPriority);
  });

  const sumPriority = priorityList.reduce((accumulator, current) => accumulator + current, 0);

  return presentSuccess({ sumPriority });
};

export const day3UseCasePart2: UseCase<null, Day3Response, Day3Error, Day3UseCaseInject> = async (_request, presenter, inject) => {
  const { presentFail, presentSuccess } = presenter;
  const { day3Storage, logger } = inject;

  const day3StoragegetDay3PuzzleInputResult = await day3Storage.getDay3Part2Puzzle();

  if (isFail(day3StoragegetDay3PuzzleInputResult)) {
    return presentFail({ type: 'INFRA_ERROR' });
  }

  const { groups } = day3StoragegetDay3PuzzleInputResult.data;

  logger.info('Number of groups', { groups: groups.length });
  const priorityList = groups.map((rucksack) => {
    const { firstRuckSack, secondRuckSack, thirdRuckSack } = rucksack;

    const sameItemListBetweenFirstAndSecond = firstRuckSack.filter((itemFirstComp) => secondRuckSack.some((itemSecondComp) => itemFirstComp.itemName === itemSecondComp.itemName));
    const sameItemListBetweenFirstAndSecondAndThird = sameItemListBetweenFirstAndSecond
      .filter((itemFirstComp) => thirdRuckSack.some((itemSecondComp) => itemFirstComp.itemName === itemSecondComp.itemName));
    const uniquesSmeItemList = [...new Map(sameItemListBetweenFirstAndSecondAndThird.map((item) => [item.itemName, item])).values()];
    const sumPriority = uniquesSmeItemList[0]?.itemName;
    return computePriority(sumPriority);
  });

  const sumPriority = priorityList.reduce((accumulator, current) => accumulator + current, 0);

  return presentSuccess({ sumPriority });
};
