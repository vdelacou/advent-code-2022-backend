import { Day3Storage } from 'app-core/port/infra/storage/day3/puzzle-storage';
import { readFileSync } from 'node:fs';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { getDay3Part1PuzzleImpl, getDay3Part2PuzzleImpl } from './impl/get_puzzle_impl';

const getDay3Text = (): string => (readFileSync(`${dirname(fileURLToPath(import.meta.url))}/day3.txt`, 'utf8'));

export const getDay3StorageImpl = (): Day3Storage => ({
  getDay3Part1Puzzle: () => getDay3Part1PuzzleImpl(getDay3Text()),
  getDay3Part2Puzzle: () => getDay3Part2PuzzleImpl(getDay3Text())
});
