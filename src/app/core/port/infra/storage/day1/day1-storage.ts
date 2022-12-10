import { Result } from 'common/interface/result';
import { GetDay1PuzzleError, GetDay1PuzzleOuput } from './dto/get-day1-puzzle';

export interface Day1Storage {
  getDay1Puzzle: () => Promise<Result<GetDay1PuzzleOuput, GetDay1PuzzleError>>;
}
