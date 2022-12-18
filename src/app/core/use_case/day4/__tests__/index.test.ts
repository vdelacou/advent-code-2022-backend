import { getFakeLogger } from 'app-core/common/__tests__/fake-logger';
import { fakePresenter } from 'app-core/common/__tests__/fake-presenter';
import { Day4Error } from 'app-core/port/api/day4/error';
import { Day4Response } from 'app-core/port/api/day4/response';
import { GetDay4Part1PuzzleOuput, GetDay4PuzzleError } from 'app-core/port/infra/storage/day4/dto/get-input-puzzle';
import { createFail, createSuccess, Result } from 'common/interface/result';
import { TestExpectedResult } from 'common/interface/test/test-expected-result';
import { Day4UseCaseInject, day4UseCasePart1, day4UseCasePart2 } from '..';

interface TestExpectedResultInput {
  getDay4Part1Puzzle: () => Promise<Result<GetDay4Part1PuzzleOuput, GetDay4PuzzleError>>;
}
interface TestExpectedResultExpected {
  response?: Day4Response;
  error?: Day4Error;
}

const testExpectedResultsPart1: TestExpectedResult<TestExpectedResultInput, TestExpectedResultExpected>[] = [
  {
    title: 'Return error when infra error',
    input: {
      getDay4Part1Puzzle: async () => createFail(null)
    },
    expected: {
      error: { type: 'INFRA_ERROR' }
    }
  },
  {
    title: 'No contains',
    input: {
      getDay4Part1Puzzle: async () => createSuccess({
        pair: [{
          firstElfAssignment: [2, 3, 4],
          secondElfAssignment: [6, 7, 8]
        }]
      })
    },
    expected: {
      response: { result: 0 }
    }
  },
  {
    title: '2-8 contains 3-7',
    input: {
      getDay4Part1Puzzle: async () => createSuccess({
        pair: [{
          firstElfAssignment: [2, 3, 4, 5, 6, 7, 8],
          secondElfAssignment: [3, 4, 5, 6, 7]
        }]
      })
    },
    expected: {
      response: { result: 1 }
    }
  },
  {
    title: '6-6 contains 4-6',
    input: {
      getDay4Part1Puzzle: async () => createSuccess({
        pair: [{
          firstElfAssignment: [6],
          secondElfAssignment: [4, 5, 6]
        }]
      })
    },
    expected: {
      response: { result: 1 }
    }
  },
  {
    title: 'example',
    input: {
      getDay4Part1Puzzle: async () => createSuccess({
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
      })
    },
    expected: {
      response: { result: 2 }
    }
  }
];

describe('Day4 Test Part 1', async () => {
  it.each(testExpectedResultsPart1)('Day4 Part 1 with arguments %p', async (testExpectedResult) => {
    // arrange
    const { input, expected } = testExpectedResult;
    const presenter = fakePresenter<Day4Response, Day4Error>();
    const logger = getFakeLogger();
    const inject: Day4UseCaseInject = { day4Storage: { getDay4Part1Puzzle: input.getDay4Part1Puzzle } };

    // act
    await day4UseCasePart1(null, presenter, { ...inject, logger });

    // assert
    const { response, error } = expected;
    expect(presenter.getPresentSuccessCallInput()).toStrictEqual(response);
    expect(presenter.getPresentFailCallInput()).toStrictEqual(error);
  });
});

interface TestExpectedResultExpected {
  response?: Day4Response;
  error?: Day4Error;
}

const testExpectedResultsPart2: TestExpectedResult<TestExpectedResultInput, TestExpectedResultExpected>[] = [
  {
    title: 'Return error when infra error',
    input: {
      getDay4Part1Puzzle: async () => createFail(null)
    },
    expected: {
      error: { type: 'INFRA_ERROR' }
    }
  },
  {
    title: '2-4 No contains 6-8',
    input: {
      getDay4Part1Puzzle: async () => createSuccess({
        pair: [{
          firstElfAssignment: [2, 3, 4],
          secondElfAssignment: [6, 7, 8]
        }]
      })
    },
    expected: {
      response: { result: 0 }
    }
  },
  {
    title: 'example',
    input: {
      getDay4Part1Puzzle: async () => createSuccess({
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
      })
    },
    expected: {
      response: { result: 4 }
    }
  }
];

describe('Day4 Test Part 2', async () => {
  it.each(testExpectedResultsPart2)('Day4 Part 2 with arguments %p', async (testExpectedResult) => {
    // arrange
    const { input, expected } = testExpectedResult;
    const presenter = fakePresenter<Day4Response, Day4Error>();
    const logger = getFakeLogger();
    const inject: Day4UseCaseInject = { day4Storage: { getDay4Part1Puzzle: input.getDay4Part1Puzzle } };

    // act
    await day4UseCasePart2(null, presenter, { ...inject, logger });

    // assert
    const { response, error } = expected;
    expect(presenter.getPresentSuccessCallInput()).toStrictEqual(response);
    expect(presenter.getPresentFailCallInput()).toStrictEqual(error);
  });
});
