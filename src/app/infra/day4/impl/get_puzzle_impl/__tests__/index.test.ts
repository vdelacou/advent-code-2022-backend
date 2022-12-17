import { GetDay4Part1PuzzleOuput, GetDay4PuzzleError } from 'app-core/port/infra/storage/day4/dto/get-input-puzzle';
import { TestExpectedResult } from 'common/interface/test/test-expected-result';
import { readFileSync } from 'node:fs';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { getDay4Part1PuzzleImpl } from '..';

interface TestExpectedResultInput {
  textFile: string;
}
interface TestPart1ExpectedResultExpected {
  response?: GetDay4Part1PuzzleOuput;
  error?: GetDay4PuzzleError;
}

const testPart1ExpectedResults: TestExpectedResult<TestExpectedResultInput, TestPart1ExpectedResultExpected>[] = [
  {
    title: 'Only one line',
    input: { textFile: readFileSync(`${dirname(fileURLToPath(import.meta.url))}/data/one_line.txt`, 'utf8') },
    expected: {
      response: {
        pair: [{
          firstElfAssignment: [2, 3, 4],
          secondElfAssignment: [6, 7, 8]
        }]
      }
    }
  },
  {
    title: 'All Together',
    input: { textFile: readFileSync(`${dirname(fileURLToPath(import.meta.url))}/data/all_together.txt`, 'utf8') },
    expected: {
      response: {
        pair: [
          {
            firstElfAssignment: [2, 3, 4],
            secondElfAssignment: [6, 7, 8]
          },
          {
            firstElfAssignment: [2, 3],
            secondElfAssignment: [4, 5]
          },
          {
            firstElfAssignment: [5, 6, 7],
            secondElfAssignment: [7, 8, 9]
          },
          {
            firstElfAssignment: [2, 3, 4, 5, 6, 7, 8],
            secondElfAssignment: [3, 4, 5, 6, 7]
          },
          {
            firstElfAssignment: [6],
            secondElfAssignment: [4, 5, 6]
          },
          {
            firstElfAssignment: [2, 3, 4, 5, 6],
            secondElfAssignment: [4, 5, 6, 7, 8]
          }
        ]
      }
    }
  }
];

describe('Get Day4 Part 1 Puzzle Input Test', async () => {
  it.each(testPart1ExpectedResults)('Day4 part1 Puzzle Input with arguments %p', async (testExpectedResult) => {
    // arrange
    const { input, expected } = testExpectedResult;

    // act
    const result = await getDay4Part1PuzzleImpl(input.textFile);

    // assert
    const { response, error } = expected;
    expect(result.data).toStrictEqual(response);
    expect(result.error).toStrictEqual(error);
  });
});
