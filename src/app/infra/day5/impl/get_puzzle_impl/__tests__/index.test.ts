import { GetDay5Part1PuzzleOuput, GetDay5PuzzleError } from 'app-core/port/infra/storage/day5/dto/get-input-puzzle';
import { TestExpectedResult } from 'common/interface/test/test-expected-result';
import { readFileSync } from 'node:fs';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { getDay5Part1PuzzleImpl } from '..';

interface TestExpectedResultInput {
  textFile: string;
}
interface TestPart1ExpectedResultExpected {
  response?: GetDay5Part1PuzzleOuput;
  error?: GetDay5PuzzleError;
}

const testPart1ExpectedResults: TestExpectedResult<TestExpectedResultInput, TestPart1ExpectedResultExpected>[] = [
  {
    title: 'No Crate Number Line',
    input: { textFile: readFileSync(`${dirname(fileURLToPath(import.meta.url))}/data/no_crate_number_line.txt`, 'utf8') },
    expected: {
      error: null
    }
  },
  {
    title: 'Only one stack and one crate',
    input: { textFile: readFileSync(`${dirname(fileURLToPath(import.meta.url))}/data/one_line.txt`, 'utf8') },
    expected: {
      response: {
        stacks: [{ number: 1, crates: ['N'] }],
        moves: []
      }
    }
  },
  {
    title: 'with empty line',
    input: { textFile: readFileSync(`${dirname(fileURLToPath(import.meta.url))}/data/empty_line.txt`, 'utf8') },
    expected: {
      response: {
        stacks: [{ number: 1, crates: ['N'] }],
        moves: []
      }
    }
  },
  {
    title: 'Only 3 stack and multiple crate',
    input: { textFile: readFileSync(`${dirname(fileURLToPath(import.meta.url))}/data/only_3_stacks.txt`, 'utf8') },
    expected: {
      response: {
        stacks: [
          { number: 1, crates: ['N', 'Z'] },
          { number: 2, crates: ['D', 'C', 'M'] },
          { number: 3, crates: ['P'] }
        ],
        moves: []
      }
    }
  },
  {
    title: 'Example',
    input: { textFile: readFileSync(`${dirname(fileURLToPath(import.meta.url))}/data/one_line_with_one_move.txt`, 'utf8') },
    expected: {
      response: {
        stacks: [{ number: 1, crates: ['N'] }],
        moves: [{
          fromIndex: 2,
          numberToMove: 1,
          toIndex: 3
        }]
      }
    }
  },
  {
    title: 'Example',
    input: { textFile: readFileSync(`${dirname(fileURLToPath(import.meta.url))}/data/example.txt`, 'utf8') },
    expected: {
      response: {
        stacks: [
          { number: 1, crates: ['N', 'Z'] },
          { number: 2, crates: ['D', 'C', 'M'] },
          { number: 3, crates: ['P'] }
        ],
        moves: [{
          numberToMove: 1,
          fromIndex: 2,
          toIndex: 1
        },
        {
          numberToMove: 3,
          fromIndex: 1,
          toIndex: 3
        },
        {
          numberToMove: 2,
          fromIndex: 2,
          toIndex: 1
        },
        {
          numberToMove: 1,
          fromIndex: 1,
          toIndex: 2
        }]
      }
    }
  }
];

describe('Get Day5 Part 1 Puzzle Input Test', async () => {
  it.each(testPart1ExpectedResults)('Day5 part1 Puzzle Input with arguments %p', async (testExpectedResult) => {
    // arrange
    const { input, expected } = testExpectedResult;

    // act
    const result = await getDay5Part1PuzzleImpl(input.textFile);

    // assert
    const { response, error } = expected;
    expect(result.data).toStrictEqual(response);
    expect(result.error).toStrictEqual(error);
  });
});
