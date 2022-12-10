import { Day1Storage } from 'app-core/port/infra/storage/day1/day1-storage';
import { readFileSync } from 'node:fs';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { getDay1PuzzleImpl } from './impl/get_day1_puzzle_impl';

const getDay1Text = (): string => (readFileSync(`${dirname(fileURLToPath(import.meta.url))}/day1.txt`, 'utf8'));

export const getDay1StorageImpl = (): Day1Storage => ({
  getDay1Puzzle: () => getDay1PuzzleImpl(getDay1Text())
});
