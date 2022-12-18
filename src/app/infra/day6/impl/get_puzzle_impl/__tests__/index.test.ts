import { GetDay6Part1PuzzleOuput, GetDay6PuzzleError } from 'app-core/port/infra/storage/day6/dto/get-input-puzzle';
import { TestExpectedResult } from 'common/interface/test/test-expected-result';
import { readFileSync } from 'node:fs';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { getDay6Part1PuzzleImpl } from '..';

interface TestExpectedResultInput {
  textFile: string;
}
interface TestPart1ExpectedResultExpected {
  response?: GetDay6Part1PuzzleOuput;
  error?: GetDay6PuzzleError;
}

const testPart1ExpectedResults: TestExpectedResult<TestExpectedResultInput, TestPart1ExpectedResultExpected>[] = [
  {
    title: 'Only one line',
    input: { textFile: readFileSync(`${dirname(fileURLToPath(import.meta.url))}/data/example.txt`, 'utf8') },
    expected: {
      response: {
        buffer: 'mjqjpqmgbljsphdztnvjfqwrcgsmlb'
      }
    }
  }

];

describe('Get Day6 Part 1 Puzzle Input Test', async () => {
  it.each(testPart1ExpectedResults)('Day6 part1 Puzzle Input with arguments %p', async (testExpectedResult) => {
    // arrange
    const { input, expected } = testExpectedResult;

    // act
    const result = await getDay6Part1PuzzleImpl(input.textFile);

    // assert
    const { response, error } = expected;
    expect(result.data).toStrictEqual(response);
    expect(result.error).toStrictEqual(error);
  });
});
