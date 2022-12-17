import { getFakeLogger } from 'app-core/common/__tests__/fake-logger';
import { fakePresenter } from 'app-core/common/__tests__/fake-presenter';
import { Day3Error } from 'app-core/port/api/day3/error';
import { Day3Response } from 'app-core/port/api/day3/response';
import { GetDay3Part1PuzzleOuput, GetDay3PuzzleError } from 'app-core/port/infra/storage/day3/dto/get-input-puzzle';
import { createFail, createSuccess, Result } from 'common/interface/result';
import { TestExpectedResult } from 'common/interface/test/test-expected-result';
import { Day3UseCaseInject, day3UseCasePart1 } from '..';

interface TestExpectedResultInput {
  getDay3Part1Puzzle: () => Promise<Result<GetDay3Part1PuzzleOuput, GetDay3PuzzleError>>;
}
interface TestExpectedResultExpected {
  response?: Day3Response;
  error?: Day3Error;
}

const testExpectedResultsPart1: TestExpectedResult<TestExpectedResultInput, TestExpectedResultExpected>[] = [
  {
    title: 'Return error when infra error',
    input: {
      getDay3Part1Puzzle: async () => createFail(null)
    },
    expected: {
      error: { type: 'INFRA_ERROR' }
    }
  },
  {
    title: 'Only one item different on each compartment',
    input: {
      getDay3Part1Puzzle: async () => createSuccess({
        rucksacks: [{
          firstCompartment: [{ itemName: 'a' }],
          secondCompartment: [{ itemName: 'b' }]
        }]
      })
    },
    expected: {
      response: { sumPriority: 0 }
    }
  },
  {
    title: 'Only one item and the same on each compartment with priority 1',
    input: {
      getDay3Part1Puzzle: async () => createSuccess({
        rucksacks: [{
          firstCompartment: [{ itemName: 'a' }],
          secondCompartment: [{ itemName: 'a' }]
        }]
      })
    },
    expected: {
      response: { sumPriority: 1 }
    }
  },
  {
    title: 'first compartment contains the items vJrwpWtwJgWr, while the second compartment contains the items hcsFMMfFFhFp, lowercase p is 16',
    input: {
      getDay3Part1Puzzle: async () => createSuccess({
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
      })
    },
    expected: {
      response: { sumPriority: 16 }
    }
  },
  {
    title: 'first compartment contains the items jqHRNqRjqzjGDLGL, while the second compartment contains the items rsFMfFZSrLrFZsSL, lowercase L is 16',
    input: {
      getDay3Part1Puzzle: async () => createSuccess({
        rucksacks: [{
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
        }]
      })
    },
    expected: {
      response: { sumPriority: 38 }
    }
  },
  {
    title: 'first compartment contains the items PmmdzqPrV, while the second compartment contains the items vPwwTWBwg, lowercase P is 42',
    input: {
      getDay3Part1Puzzle: async () => createSuccess({
        rucksacks: [{
          firstCompartment: [
            { itemName: 'P' }, { itemName: 'm' }, { itemName: 'm' }, { itemName: 'd' }, { itemName: 'z' }, { itemName: 'q' },
            { itemName: 'P' }, { itemName: 'r' }, { itemName: 'V' }
          ],
          secondCompartment: [
            { itemName: 'v' }, { itemName: 'P' }, { itemName: 'w' }, { itemName: 'w' }, { itemName: 'T' }, { itemName: 'W' },
            { itemName: 'B' }, { itemName: 'w' }, { itemName: 'g' }
          ]
        }]
      })
    },
    expected: {
      response: { sumPriority: 42 }
    }
  },
  {
    title: 'first compartment contains the items wMqvLMZHhHMvwLH, while the second compartment contains the items jbvcjnnSBnvTQFn, lowercase v is 22',
    input: {
      getDay3Part1Puzzle: async () => createSuccess({
        rucksacks: [{
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
        }]
      })
    },
    expected: {
      response: { sumPriority: 22 }
    }
  },
  {
    title: 'first compartment contains the items ttgJtRGJ, while the second compartment contains the items QctTZtZT, lowercase t is 20',
    input: {
      getDay3Part1Puzzle: async () => createSuccess({
        rucksacks: [{
          firstCompartment: [
            { itemName: 't' }, { itemName: 't' }, { itemName: 'g' }, { itemName: 'J' }, { itemName: 't' }, { itemName: 'R' },
            { itemName: 'G' }, { itemName: 'J' }
          ],
          secondCompartment: [
            { itemName: 'Q' }, { itemName: 'c' }, { itemName: 't' }, { itemName: 'T' }, { itemName: 'Z' }, { itemName: 't' },
            { itemName: 'Z' }, { itemName: 'T' }
          ]
        }]
      })
    },
    expected: {
      response: { sumPriority: 20 }
    }
  },
  {
    title: 'first compartment contains the items CrZsJsPPZsGz, while the second compartment contains the items wwsLwLmpwMDw, lowercase s is 19',
    input: {
      getDay3Part1Puzzle: async () => createSuccess({
        rucksacks: [{
          firstCompartment: [
            { itemName: 'C' }, { itemName: 'r' }, { itemName: 'Z' }, { itemName: 's' }, { itemName: 'J' }, { itemName: 's' },
            { itemName: 'P' }, { itemName: 'P' }, { itemName: 'Z' }, { itemName: 's' }, { itemName: 'G' }, { itemName: 'z' }
          ],
          secondCompartment: [
            { itemName: 'w' }, { itemName: 'w' }, { itemName: 's' }, { itemName: 'L' }, { itemName: 'w' }, { itemName: 'L' },
            { itemName: 'm' }, { itemName: 'p' }, { itemName: 'w' }, { itemName: 'M' }, { itemName: 'D' }, { itemName: 'w' }
          ]
        }]
      })
    },
    expected: {
      response: { sumPriority: 19 }
    }
  },
  {
    title: 'All Together, result should be 157',
    input: {
      getDay3Part1Puzzle: async () => createSuccess({
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
      })
    },
    expected: {
      response: { sumPriority: 157 }
    }
  }

];

describe('Day3 Test Part 1', async () => {
  it.each(testExpectedResultsPart1)('Day3 Part 1 with arguments %p', async (testExpectedResult) => {
    // arrange
    const { input, expected } = testExpectedResult;
    const presenter = fakePresenter<Day3Response, Day3Error>();
    const logger = getFakeLogger();
    const inject: Day3UseCaseInject = { day3Storage: { getDay3Part1Puzzle: input.getDay3Part1Puzzle } };

    // act
    await day3UseCasePart1(null, presenter, { ...inject, logger });

    // assert
    const { response, error } = expected;
    expect(presenter.getPresentSuccessCallInput()).toStrictEqual(response);
    expect(presenter.getPresentFailCallInput()).toStrictEqual(error);
  });
});
