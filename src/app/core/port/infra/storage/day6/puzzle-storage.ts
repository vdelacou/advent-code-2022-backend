import { Result } from 'common/interface/result';
import { GetDay6Part1PuzzleOuput, GetDay6PuzzleError } from './dto/get-input-puzzle';

export interface Day6Storage {
  getDay6Part1Puzzle: () => Promise<Result<GetDay6Part1PuzzleOuput, GetDay6PuzzleError>>;
}
