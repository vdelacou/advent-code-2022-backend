import { Day4Storage } from 'app-core/port/infra/storage/day4/puzzle-storage';
import { readFileSync } from 'node:fs';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { getDay4Part1PuzzleImpl } from './impl/get_puzzle_impl';

const getDay4Text = (): string => (readFileSync(`${dirname(fileURLToPath(import.meta.url))}/day4.txt`, 'utf8'));

export const getDay4StorageImpl = (): Day4Storage => ({
  getDay4Part1Puzzle: () => getDay4Part1PuzzleImpl(getDay4Text())
  // getDay4Part2Puzzle: () => getDay4Part2PuzzleImpl(getDay4Text())
});
