import { Day2Storage } from 'app-core/port/infra/storage/day2/day2-storage';
import { readFileSync } from 'node:fs';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { getDay2Part1PuzzleImpl, getDay2Part2PuzzleImpl } from './impl/get_day2_puzzle_impl';

const getDay2Text = (): string => (readFileSync(`${dirname(fileURLToPath(import.meta.url))}/day2.txt`, 'utf8'));

export const getDay2StorageImpl = (): Day2Storage => ({
  getDay2Part1Puzzle: () => getDay2Part1PuzzleImpl(getDay2Text()),
  getDay2Part2Puzzle: () => getDay2Part2PuzzleImpl(getDay2Text())

});
