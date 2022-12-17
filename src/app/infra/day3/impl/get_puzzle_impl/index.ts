import {
  Character, GetDay3Part1PuzzleOuput, GetDay3Part2PuzzleOuput, GetDay3PuzzleError
} from 'app-core/port/infra/storage/day3/dto/get-input-puzzle';
import { createSuccess, Result } from 'common/interface/result';

export const getDay3Part1PuzzleImpl = async (textFile: string): Promise<Result<GetDay3Part1PuzzleOuput, GetDay3PuzzleError>> => {
  const lines = textFile.split('\n');

  const result = lines.map((line) => {
    const firstCompartmentLine = line.slice(0, (line.length / 2));
    const secondCompartmentLine = line.slice((line.length / 2), line.length);
    const firstCompartment = [...firstCompartmentLine].map((value) => ({ itemName: value as Character }));
    const secondCompartment = [...secondCompartmentLine].map((value) => ({ itemName: value as Character }));
    return {
      firstCompartment,
      secondCompartment
    };
  });

  return createSuccess({ rucksacks: result });
};

const spliceIntoChunks = (array: string[], chunkSize: number): string[][] => {
  const result = [];
  while (array.length > 0) {
    const chunk = array.splice(0, chunkSize);
    result.push(chunk);
  }
  return result;
};

export const getDay3Part2PuzzleImpl = async (textFile: string): Promise<Result<GetDay3Part2PuzzleOuput, GetDay3PuzzleError>> => {
  const lines = textFile.split('\n');

  const arrayGroup = spliceIntoChunks(lines, 3);

  const result = arrayGroup.map((groups) => {
    const firstGroupLine = groups[0];
    const secondGroupLine = groups[1];
    const thirdGroupLine = groups[2];
    const firstRuckSack = [...firstGroupLine].map((value) => ({ itemName: value as Character }));
    const secondRuckSack = [...secondGroupLine].map((value) => ({ itemName: value as Character }));
    const thirdRuckSack = [...thirdGroupLine].map((value) => ({ itemName: value as Character }));
    return {
      firstRuckSack,
      secondRuckSack,
      thirdRuckSack
    };
  });

  return createSuccess({ groups: result });
};
