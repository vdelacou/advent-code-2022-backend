import { Result } from 'common/interface/result';
import { GetDay3Part1PuzzleOuput, GetDay3Part2PuzzleOuput, GetDay3PuzzleError } from './dto/get-input-puzzle';

export interface Day3Storage {
  getDay3Part1Puzzle: () => Promise<Result<GetDay3Part1PuzzleOuput, GetDay3PuzzleError>>;
  getDay3Part2Puzzle: () => Promise<Result<GetDay3Part2PuzzleOuput, GetDay3PuzzleError>>;
}
