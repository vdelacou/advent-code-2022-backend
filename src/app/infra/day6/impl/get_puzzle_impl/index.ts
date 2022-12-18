import {
  GetDay6Part1PuzzleOuput, GetDay6PuzzleError
} from 'app-core/port/infra/storage/day6/dto/get-input-puzzle';
import { createSuccess, Result } from 'common/interface/result';

export const getDay6Part1PuzzleImpl = async (textFile: string)
  : Promise<Result<GetDay6Part1PuzzleOuput, GetDay6PuzzleError>> => createSuccess({ buffer: textFile });
