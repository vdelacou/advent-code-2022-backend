import { GetDay3Part1PuzzleOuput, GetDay3Part2PuzzleOuput, GetDay3PuzzleError } from 'app-core/port/infra/storage/day3/dto/get-input-puzzle';
import { TestExpectedResult } from 'common/interface/test/test-expected-result';
import { readFileSync } from 'node:fs';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { getDay3Part1PuzzleImpl, getDay3Part2PuzzleImpl } from '..';

interface TestExpectedResultInput {
  textFile: string;
}
interface TestPart1ExpectedResultExpected {
  response?: GetDay3Part1PuzzleOuput;
  error?: GetDay3PuzzleError;
}

const testPart1ExpectedResults: TestExpectedResult<TestExpectedResultInput, TestPart1ExpectedResultExpected>[] = [
  {
    title: 'Only one line',
    input: { textFile: readFileSync(`${dirname(fileURLToPath(import.meta.url))}/data/one_line.txt`, 'utf8') },
    expected: {
      response: {
        rucksacks: [{
          firstCompartment: [
            { itemName: 'v' }, { itemName: 'J' }, { itemName: 'r' }, { itemName: 'w' }, { itemName: 'p' }, { itemName: 'W' },
            { itemName: 't' }, { itemName: 'w' }, { itemName: 'J' }, { itemName: 'g' }, { itemName: 'W' }, { itemName: 'r' }
          ],
          secondCompartment: [
            { itemName: 'h' }, { itemName: 'c' }, { itemName: 's' }, { itemName: 'F' }, { itemName: 'M' }, { itemName: 'M' },
            { itemName: 'f' }, { itemName: 'F' }, { itemName: 'F' }, { itemName: 'h' }, { itemName: 'F' }, { itemName: 'p' }
          ]
        }]
      }
    }
  },
  {
    title: 'All Together',
    input: { textFile: readFileSync(`${dirname(fileURLToPath(import.meta.url))}/data/all_together.txt`, 'utf8') },
    expected: {
      response: {
        rucksacks: [
          {
            firstCompartment: [
              { itemName: 'v' }, { itemName: 'J' }, { itemName: 'r' }, { itemName: 'w' }, { itemName: 'p' }, { itemName: 'W' },
              { itemName: 't' }, { itemName: 'w' }, { itemName: 'J' }, { itemName: 'g' }, { itemName: 'W' }, { itemName: 'r' }
            ],
            secondCompartment: [
              { itemName: 'h' }, { itemName: 'c' }, { itemName: 's' }, { itemName: 'F' }, { itemName: 'M' }, { itemName: 'M' },
              { itemName: 'f' }, { itemName: 'F' }, { itemName: 'F' }, { itemName: 'h' }, { itemName: 'F' }, { itemName: 'p' }
            ]
          },
          {
            firstCompartment: [
              { itemName: 'j' }, { itemName: 'q' }, { itemName: 'H' }, { itemName: 'R' }, { itemName: 'N' }, { itemName: 'q' },
              { itemName: 'R' }, { itemName: 'j' }, { itemName: 'q' }, { itemName: 'z' }, { itemName: 'j' }, { itemName: 'G' },
              { itemName: 'D' }, { itemName: 'L' }, { itemName: 'G' }, { itemName: 'L' }
            ],
            secondCompartment: [
              { itemName: 'r' }, { itemName: 's' }, { itemName: 'F' }, { itemName: 'M' }, { itemName: 'f' }, { itemName: 'F' },
              { itemName: 'Z' }, { itemName: 'S' }, { itemName: 'r' }, { itemName: 'L' }, { itemName: 'r' }, { itemName: 'F' },
              { itemName: 'Z' }, { itemName: 's' }, { itemName: 'S' }, { itemName: 'L' }
            ]
          },
          {
            firstCompartment: [
              { itemName: 'P' }, { itemName: 'm' }, { itemName: 'm' }, { itemName: 'd' }, { itemName: 'z' }, { itemName: 'q' },
              { itemName: 'P' }, { itemName: 'r' }, { itemName: 'V' }
            ],
            secondCompartment: [
              { itemName: 'v' }, { itemName: 'P' }, { itemName: 'w' }, { itemName: 'w' }, { itemName: 'T' }, { itemName: 'W' },
              { itemName: 'B' }, { itemName: 'w' }, { itemName: 'g' }
            ]
          },
          {
            firstCompartment: [
              { itemName: 'w' }, { itemName: 'M' }, { itemName: 'q' }, { itemName: 'v' }, { itemName: 'L' }, { itemName: 'M' },
              { itemName: 'Z' }, { itemName: 'H' }, { itemName: 'h' }, { itemName: 'H' }, { itemName: 'M' }, { itemName: 'v' },
              { itemName: 'w' }, { itemName: 'L' }, { itemName: 'H' }
            ],
            secondCompartment: [
              { itemName: 'j' }, { itemName: 'b' }, { itemName: 'v' }, { itemName: 'c' }, { itemName: 'j' }, { itemName: 'n' },
              { itemName: 'n' }, { itemName: 'S' }, { itemName: 'B' }, { itemName: 'n' }, { itemName: 'v' }, { itemName: 'T' },
              { itemName: 'Q' }, { itemName: 'F' }, { itemName: 'n' }
            ]
          },
          {
            firstCompartment: [
              { itemName: 't' }, { itemName: 't' }, { itemName: 'g' }, { itemName: 'J' }, { itemName: 't' }, { itemName: 'R' },
              { itemName: 'G' }, { itemName: 'J' }
            ],
            secondCompartment: [
              { itemName: 'Q' }, { itemName: 'c' }, { itemName: 't' }, { itemName: 'T' }, { itemName: 'Z' }, { itemName: 't' },
              { itemName: 'Z' }, { itemName: 'T' }
            ]
          },
          {
            firstCompartment: [
              { itemName: 'C' }, { itemName: 'r' }, { itemName: 'Z' }, { itemName: 's' }, { itemName: 'J' }, { itemName: 's' },
              { itemName: 'P' }, { itemName: 'P' }, { itemName: 'Z' }, { itemName: 's' }, { itemName: 'G' }, { itemName: 'z' }
            ],
            secondCompartment: [
              { itemName: 'w' }, { itemName: 'w' }, { itemName: 's' }, { itemName: 'L' }, { itemName: 'w' }, { itemName: 'L' },
              { itemName: 'm' }, { itemName: 'p' }, { itemName: 'w' }, { itemName: 'M' }, { itemName: 'D' }, { itemName: 'w' }
            ]
          }
        ]
      }
    }
  }
];

describe('Get Day3 Part 1 Puzzle Input Test', async () => {
  it.each(testPart1ExpectedResults)('Day3 part1 Puzzle Input with arguments %p', async (testExpectedResult) => {
    // arrange
    const { input, expected } = testExpectedResult;

    // act
    const result = await getDay3Part1PuzzleImpl(input.textFile);

    // assert
    const { response, error } = expected;
    expect(result.data).toStrictEqual(response);
    expect(result.error).toStrictEqual(error);
  });
});

interface TestPart2ExpectedResultExpected {
  response?: GetDay3Part2PuzzleOuput;
  error?: GetDay3PuzzleError;
}

const testPart2ExpectedResults: TestExpectedResult<TestExpectedResultInput, TestPart2ExpectedResultExpected>[] = [
  {
    title: 'Only one line',
    input: { textFile: readFileSync(`${dirname(fileURLToPath(import.meta.url))}/data/one_group.txt`, 'utf8') },
    expected: {
      response: {
        groups: [{
          firstRuckSack: [
            { itemName: 'v' }, { itemName: 'J' }, { itemName: 'r' }, { itemName: 'w' }, { itemName: 'p' }, { itemName: 'W' },
            { itemName: 't' }, { itemName: 'w' }, { itemName: 'J' }, { itemName: 'g' }, { itemName: 'W' }, { itemName: 'r' },
            { itemName: 'h' }, { itemName: 'c' }, { itemName: 's' }, { itemName: 'F' }, { itemName: 'M' }, { itemName: 'M' },
            { itemName: 'f' }, { itemName: 'F' }, { itemName: 'F' }, { itemName: 'h' }, { itemName: 'F' }, { itemName: 'p' }
          ],
          secondRuckSack: [
            { itemName: 'j' }, { itemName: 'q' }, { itemName: 'H' }, { itemName: 'R' }, { itemName: 'N' }, { itemName: 'q' },
            { itemName: 'R' }, { itemName: 'j' }, { itemName: 'q' }, { itemName: 'z' }, { itemName: 'j' }, { itemName: 'G' },
            { itemName: 'D' }, { itemName: 'L' }, { itemName: 'G' }, { itemName: 'L' },
            { itemName: 'r' }, { itemName: 's' }, { itemName: 'F' }, { itemName: 'M' }, { itemName: 'f' }, { itemName: 'F' },
            { itemName: 'Z' }, { itemName: 'S' }, { itemName: 'r' }, { itemName: 'L' }, { itemName: 'r' }, { itemName: 'F' },
            { itemName: 'Z' }, { itemName: 's' }, { itemName: 'S' }, { itemName: 'L' }
          ],
          thirdRuckSack: [
            { itemName: 'P' }, { itemName: 'm' }, { itemName: 'm' }, { itemName: 'd' }, { itemName: 'z' }, { itemName: 'q' },
            { itemName: 'P' }, { itemName: 'r' }, { itemName: 'V' },
            { itemName: 'v' }, { itemName: 'P' }, { itemName: 'w' }, { itemName: 'w' }, { itemName: 'T' }, { itemName: 'W' },
            { itemName: 'B' }, { itemName: 'w' }, { itemName: 'g' }
          ]
        }]
      }
    }
  },
  {
    title: 'all together',
    input: { textFile: readFileSync(`${dirname(fileURLToPath(import.meta.url))}/data/all_together.txt`, 'utf8') },
    expected: {
      response: {
        groups: [{
          firstRuckSack: [
            { itemName: 'v' }, { itemName: 'J' }, { itemName: 'r' }, { itemName: 'w' }, { itemName: 'p' }, { itemName: 'W' },
            { itemName: 't' }, { itemName: 'w' }, { itemName: 'J' }, { itemName: 'g' }, { itemName: 'W' }, { itemName: 'r' },
            { itemName: 'h' }, { itemName: 'c' }, { itemName: 's' }, { itemName: 'F' }, { itemName: 'M' }, { itemName: 'M' },
            { itemName: 'f' }, { itemName: 'F' }, { itemName: 'F' }, { itemName: 'h' }, { itemName: 'F' }, { itemName: 'p' }
          ],
          secondRuckSack: [
            { itemName: 'j' }, { itemName: 'q' }, { itemName: 'H' }, { itemName: 'R' }, { itemName: 'N' }, { itemName: 'q' },
            { itemName: 'R' }, { itemName: 'j' }, { itemName: 'q' }, { itemName: 'z' }, { itemName: 'j' }, { itemName: 'G' },
            { itemName: 'D' }, { itemName: 'L' }, { itemName: 'G' }, { itemName: 'L' },
            { itemName: 'r' }, { itemName: 's' }, { itemName: 'F' }, { itemName: 'M' }, { itemName: 'f' }, { itemName: 'F' },
            { itemName: 'Z' }, { itemName: 'S' }, { itemName: 'r' }, { itemName: 'L' }, { itemName: 'r' }, { itemName: 'F' },
            { itemName: 'Z' }, { itemName: 's' }, { itemName: 'S' }, { itemName: 'L' }
          ],
          thirdRuckSack: [
            { itemName: 'P' }, { itemName: 'm' }, { itemName: 'm' }, { itemName: 'd' }, { itemName: 'z' }, { itemName: 'q' },
            { itemName: 'P' }, { itemName: 'r' }, { itemName: 'V' },
            { itemName: 'v' }, { itemName: 'P' }, { itemName: 'w' }, { itemName: 'w' }, { itemName: 'T' }, { itemName: 'W' },
            { itemName: 'B' }, { itemName: 'w' }, { itemName: 'g' }
          ]
        },
        {
          firstRuckSack: [
            { itemName: 'w' }, { itemName: 'M' }, { itemName: 'q' }, { itemName: 'v' }, { itemName: 'L' }, { itemName: 'M' },
            { itemName: 'Z' }, { itemName: 'H' }, { itemName: 'h' }, { itemName: 'H' }, { itemName: 'M' }, { itemName: 'v' },
            { itemName: 'w' }, { itemName: 'L' }, { itemName: 'H' },
            { itemName: 'j' }, { itemName: 'b' }, { itemName: 'v' }, { itemName: 'c' }, { itemName: 'j' }, { itemName: 'n' },
            { itemName: 'n' }, { itemName: 'S' }, { itemName: 'B' }, { itemName: 'n' }, { itemName: 'v' }, { itemName: 'T' },
            { itemName: 'Q' }, { itemName: 'F' }, { itemName: 'n' }
          ],
          secondRuckSack: [
            { itemName: 't' }, { itemName: 't' }, { itemName: 'g' }, { itemName: 'J' }, { itemName: 't' }, { itemName: 'R' },
            { itemName: 'G' }, { itemName: 'J' },
            { itemName: 'Q' }, { itemName: 'c' }, { itemName: 't' }, { itemName: 'T' }, { itemName: 'Z' }, { itemName: 't' },
            { itemName: 'Z' }, { itemName: 'T' }
          ],
          thirdRuckSack: [
            { itemName: 'C' }, { itemName: 'r' }, { itemName: 'Z' }, { itemName: 's' }, { itemName: 'J' }, { itemName: 's' },
            { itemName: 'P' }, { itemName: 'P' }, { itemName: 'Z' }, { itemName: 's' }, { itemName: 'G' }, { itemName: 'z' },
            { itemName: 'w' }, { itemName: 'w' }, { itemName: 's' }, { itemName: 'L' }, { itemName: 'w' }, { itemName: 'L' },
            { itemName: 'm' }, { itemName: 'p' }, { itemName: 'w' }, { itemName: 'M' }, { itemName: 'D' }, { itemName: 'w' }
          ]
        }]
      }
    }
  }
];

describe('Get Day3 Part 2 Puzzle Input Test', async () => {
  it.each(testPart2ExpectedResults)('Day3 part 2 Puzzle Input with arguments %p', async (testExpectedResult) => {
    // arrange
    const { input, expected } = testExpectedResult;

    // act
    const result = await getDay3Part2PuzzleImpl(input.textFile);

    // assert
    const { response, error } = expected;
    expect(result.data).toStrictEqual(response);
    expect(result.error).toStrictEqual(error);
  });
});
