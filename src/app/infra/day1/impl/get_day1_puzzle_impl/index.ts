import { GetDay1PuzzleError, GetDay1PuzzleOuput } from 'app-core/port/infra/storage/day1/dto/get-day1-puzzle';
import { Result } from 'common/interface/result';

export const getDay1PuzzleImpl = async (textFile: string): Promise<Result<GetDay1PuzzleOuput, GetDay1PuzzleError>> => {
  const lines = textFile.split('\n\n');

  const caloriesByLine = lines.map((line) => line.split('\n').map((caloryLine) => {
    const calory = Number.parseInt(caloryLine, 10);
    return calory || undefined;
  }));
  const result = caloriesByLine.map((value) => {
    const elf = {
      calories: value.flatMap((calory) => (calory ? [calory] : []))
    };
    return elf;
  });
  return { data: { elf: result } };
};
