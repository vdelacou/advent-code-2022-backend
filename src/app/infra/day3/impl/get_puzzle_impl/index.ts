import { Character, GetDay3Part1PuzzleOuput, GetDay3PuzzleError } from 'app-core/port/infra/storage/day3/dto/get-input-puzzle';
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
