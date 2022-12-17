import {
  GetDay4Part1PuzzleOuput, GetDay4PuzzleError
} from 'app-core/port/infra/storage/day4/dto/get-input-puzzle';
import { createSuccess, Result } from 'common/interface/result';

const range = (start: number, end: number): number[] => {
  const diff = end - start;
  if (diff === 0) {
    return [start];
  }

  const keys = Array.from({ length: diff + 1 }).keys();
  return [...keys].map((x) => {
    const increment = x;
    return start + increment;
  });
};

export const getDay4Part1PuzzleImpl = async (textFile: string): Promise<Result<GetDay4Part1PuzzleOuput, GetDay4PuzzleError>> => {
  const lines = textFile.split('\n');

  const result = lines.map((line) => {
    const splitPair = line.split(',');
    const firstElf = splitPair[0];
    const secondElf = splitPair[1];
    const splitFirstElf = firstElf.split('-');
    const splitSecondElf = secondElf.split('-');
    const firstElfAssignment = range(Number(splitFirstElf[0]), Number(splitFirstElf[1]));
    const secondElfAssignment = range(Number(splitSecondElf[0]), Number(splitSecondElf[1]));
    return {
      firstElfAssignment,
      secondElfAssignment
    };
  });

  return createSuccess({ pair: result });
};
