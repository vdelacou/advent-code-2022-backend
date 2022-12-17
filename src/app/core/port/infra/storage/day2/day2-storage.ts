import { Result } from 'common/interface/result';
import { GetDay2Part1PuzzleOuput, GetDay2Part2PuzzleOuput, GetDay2PuzzleError } from './dto/get-day2-puzzle';

export interface Day2Storage {
  getDay2Part1Puzzle: () => Promise<Result<GetDay2Part1PuzzleOuput, GetDay2PuzzleError>>;
  getDay2Part2Puzzle: () => Promise<Result<GetDay2Part2PuzzleOuput, GetDay2PuzzleError>>;
}
