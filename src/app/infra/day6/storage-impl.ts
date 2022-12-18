import { Day6Storage } from 'app-core/port/infra/storage/day6/puzzle-storage';
import { readFileSync } from 'node:fs';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { getDay6Part1PuzzleImpl } from './impl/get_puzzle_impl';

const getDay6Text = (): string => (readFileSync(`${dirname(fileURLToPath(import.meta.url))}/day6.txt`, 'utf8'));

export const getDay6StorageImpl = (): Day6Storage => ({
  getDay6Part1Puzzle: () => getDay6Part1PuzzleImpl(getDay6Text())
});
