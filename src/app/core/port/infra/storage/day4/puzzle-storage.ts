import { Result } from 'common/interface/result';
import { GetDay4Part1PuzzleOuput, GetDay4PuzzleError } from './dto/get-input-puzzle';

export interface Day4Storage {
  getDay4Part1Puzzle: () => Promise<Result<GetDay4Part1PuzzleOuput, GetDay4PuzzleError>>;
  // getDay4Part2Puzzle: () => Promise<Result<GetDay4Part2PuzzleOuput, GetDay4PuzzleError>>;
}
