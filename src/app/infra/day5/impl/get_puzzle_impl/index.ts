import {
  GetDay5Part1PuzzleOuput, GetDay5PuzzleError
} from 'app-core/port/infra/storage/day5/dto/get-input-puzzle';
import { createFail, createSuccess, Result } from 'common/interface/result';

const regexMove = /\b(\d+)\b/g;
const spliceIntoChunks = (array: string[], chunkSize: number): string[][] => {
  const result = [];
  while (array.length > 0) {
    const chunk = array.splice(0, chunkSize);
    result.push(chunk);
  }
  return result;
};

export const getDay5Part1PuzzleImpl = async (textFile: string): Promise<Result<GetDay5Part1PuzzleOuput, GetDay5PuzzleError>> => {
  const lines = textFile.split('\n');

  const indexLineWithStacksNumberIndex = lines.findIndex((value) => value.startsWith(' 1'));
  const indexLineWithStacksNumber = lines.at(indexLineWithStacksNumberIndex);
  if (indexLineWithStacksNumberIndex === -1 || !indexLineWithStacksNumber) {
    return createFail(null);
  }

  // crate
  const stacksNumbers = indexLineWithStacksNumber.split(' ')
    .map(Number)
    .filter((number) => number !== 0);

  const crateLines = [...Array.from({ length: indexLineWithStacksNumberIndex }).keys()].map((index) => {
    const crateLine = lines.at(index) || '';
    const lineInBlock = spliceIntoChunks([...crateLine], 4);
    const cleanBlock = lineInBlock.map((block) => {
      const blockTrimmed = block.join('').trim();
      return blockTrimmed.replaceAll('[', '').replaceAll(']', '');
    });
    const result = stacksNumbers.map((number) => cleanBlock.at(number - 1) || ' ');
    return result;
  });

  const stacks = stacksNumbers.map((number) => {
    const crates = crateLines.map((line) => {
      const crateName = line.at(number - 1)?.trim() || '';
      return crateName;
    }).filter((value) => value !== '');
    return { number, crates };
  });

  const moves = lines.map((line, index) => {
    if (index < indexLineWithStacksNumberIndex + 2) {
      return null;
    }
    const numbers = [];
    let match = regexMove.exec(line);
    while (match !== null) {
      numbers.push(Number.parseInt(match[1], 10));
      match = regexMove.exec(line);
    }

    if (numbers.length === 3) {
      const move: { fromIndex: number; toIndex: number; numberToMove: number; } = {
        fromIndex: numbers[1],
        toIndex: numbers[2],
        numberToMove: numbers[0]
      };
      return move;
    }
    return null;
  }).flatMap((value) => (value ? [value] : []));

  return createSuccess({ stacks, moves });
};
