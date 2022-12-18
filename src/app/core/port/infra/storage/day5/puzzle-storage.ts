import { Result } from 'common/interface/result';
import { GetDay5Part1PuzzleOuput, GetDay5PuzzleError } from './dto/get-input-puzzle';

export interface Day5Storage {
  getDay5Part1Puzzle: () => Promise<Result<GetDay5Part1PuzzleOuput, GetDay5PuzzleError>>;
}
