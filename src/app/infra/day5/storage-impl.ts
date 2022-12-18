import { Day5Storage } from 'app-core/port/infra/storage/day5/puzzle-storage';
import { readFileSync } from 'node:fs';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { getDay5Part1PuzzleImpl } from './impl/get_puzzle_impl';

const getDay5Text = (): string => (readFileSync(`${dirname(fileURLToPath(import.meta.url))}/day5.txt`, 'utf8'));

export const getDay5StorageImpl = (): Day5Storage => ({
  getDay5Part1Puzzle: () => getDay5Part1PuzzleImpl(getDay5Text())
  // getDay5Part2Puzzle: () => getDay5Part2PuzzleImpl(getDay5Text())
});
