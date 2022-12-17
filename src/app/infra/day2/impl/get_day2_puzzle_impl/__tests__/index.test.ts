import { GetDay2Part1PuzzleOuput, GetDay2Part2PuzzleOuput, GetDay2PuzzleError } from 'app-core/port/infra/storage/day2/dto/get-day2-puzzle';
import { TestExpectedResult } from 'common/interface/test/test-expected-result';
import { readFileSync } from 'node:fs';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { getDay2Part1PuzzleImpl, getDay2Part2PuzzleImpl } from '..';

interface TestExpectedResultInput {
  textFile: string;
}
interface TestPart1ExpectedResultExpected {
  response?: GetDay2Part1PuzzleOuput;
  error?: GetDay2PuzzleError;
}

const testPart1ExpectedResults: TestExpectedResult<TestExpectedResultInput, TestPart1ExpectedResultExpected>[] = [
  {
    title: 'Only one elf one number',
    input: { textFile: readFileSync(`${dirname(fileURLToPath(import.meta.url))}/data/one_line.txt`, 'utf8') },
    expected: {
      response: { rounds: [{ opponentHand: 'SCISSORS', ourHand: 'PAPER' }] }
    }
  },
  {
    title: 'Only one elf one number',
    input: { textFile: readFileSync(`${dirname(fileURLToPath(import.meta.url))}/data/all_sign.txt`, 'utf8') },
    expected: {
      response: {
        rounds: [
          { opponentHand: 'ROCK', ourHand: 'ROCK' },
          { opponentHand: 'PAPER', ourHand: 'PAPER' },
          { opponentHand: 'SCISSORS', ourHand: 'SCISSORS' }
        ]
      }
    }
  }
];

describe('Get Day2 Part 1 Puzzle Input Test', async () => {
  it.each(testPart1ExpectedResults)('Day2 part1 Puzzle Input with arguments %p', async (testExpectedResult) => {
    // arrange
    const { input, expected } = testExpectedResult;

    // act
    const result = await getDay2Part1PuzzleImpl(input.textFile);

    // assert
    const { response, error } = expected;
    expect(result.data).toStrictEqual(response);
    expect(result.error).toStrictEqual(error);
  });
});

interface TestPart2ExpectedResultExpected {
  response?: GetDay2Part2PuzzleOuput;
  error?: GetDay2PuzzleError;
}

const testPart2ExpectedResults: TestExpectedResult<TestExpectedResultInput, TestPart2ExpectedResultExpected>[] = [
  {
    title: 'Only one elf one number',
    input: { textFile: readFileSync(`${dirname(fileURLToPath(import.meta.url))}/data/one_line.txt`, 'utf8') },
    expected: {
      response: { rounds: [{ opponentHand: 'SCISSORS', result: 'DRAW' }] }
    }
  },
  {
    title: 'Only one elf one number',
    input: { textFile: readFileSync(`${dirname(fileURLToPath(import.meta.url))}/data/all_sign.txt`, 'utf8') },
    expected: {
      response: {
        rounds: [
          { opponentHand: 'ROCK', result: 'LOOSE' },
          { opponentHand: 'PAPER', result: 'DRAW' },
          { opponentHand: 'SCISSORS', result: 'WIN' }
        ]
      }
    }
  }
];

describe('Get Day2 Part 2 Puzzle Input Test', async () => {
  it.each(testPart2ExpectedResults)('Day2 part1 Puzzle Input with arguments %p', async (testExpectedResult) => {
    // arrange
    const { input, expected } = testExpectedResult;

    // act
    const result = await getDay2Part2PuzzleImpl(input.textFile);

    // assert
    const { response, error } = expected;
    expect(result.data).toStrictEqual(response);
    expect(result.error).toStrictEqual(error);
  });
});
