import { getFakeLogger } from 'app-core/common/__tests__/fake-logger';
import { fakePresenter } from 'app-core/common/__tests__/fake-presenter';
import { Day1Error } from 'app-core/port/api/day1/error';
import { Day1Response } from 'app-core/port/api/day1/response';
import { GetDay1PuzzleError, GetDay1PuzzleOuput } from 'app-core/port/infra/storage/day1/dto/get-day1-puzzle';
import { createFail, createSuccess, Result } from 'common/interface/result';
import { TestExpectedResult } from 'common/interface/test/test-expected-result';
import { day1UseCase, Day1UseCaseInject } from '..';

interface TestExpectedResultInput {
  getDay1Puzzle: () => Promise<Result<GetDay1PuzzleOuput, GetDay1PuzzleError>>;
}
interface TestExpectedResultExpected {
  response?: Day1Response;
  error?: Day1Error;
}

const testExpectedResults: TestExpectedResult<TestExpectedResultInput, TestExpectedResultExpected>[] = [
  {
    title: 'Return error when infra error',
    input: {
      getDay1Puzzle: async () => createFail(null)
    },
    expected: {
      error: { type: 'INFRA_ERROR' }
    }
  },
  {
    title: 'Only one number and one elf',
    input: {
      getDay1Puzzle: async () => createSuccess({ elf: [{ calories: [1] }] })
    },
    expected: {
      response: { mostCalories: 1, topThree: 1 }
    }
  },
  {
    title: 'Two number for one elf',
    input: {
      getDay1Puzzle: async () => createSuccess({ elf: [{ calories: [1, 2] }] })
    },
    expected: {
      response: { mostCalories: 3, topThree: 3 }
    }
  },
  {
    title: 'Two number for two elf, find max',
    input: {
      getDay1Puzzle: async () => createSuccess({ elf: [{ calories: [1, 2] }, { calories: [3, 4] }] })
    },
    expected: {
      response: { mostCalories: 7, topThree: 10 }
    }
  },
  {
    title: 'Use the example from the puzzle',
    input: {
      getDay1Puzzle: async () => createSuccess({
        elf: [
          { calories: [1000, 2000, 3000] },
          { calories: [4000] },
          { calories: [5000, 6000] },
          { calories: [7000, 8000, 9000] },
          { calories: [10_000] }
        ]
      })
    },
    expected: {
      response: { mostCalories: 24_000, topThree: 45_000 }
    }
  }

];

describe('Day1 Test', async () => {
  it.each(testExpectedResults)('Day1 with arguments %p', async (testExpectedResult) => {
    // arrange
    const { input, expected } = testExpectedResult;
    const presenter = fakePresenter<Day1Response, Day1Error>();
    const logger = getFakeLogger();
    const inject: Day1UseCaseInject = {
      day1Storage: {
        getDay1Puzzle: input.getDay1Puzzle
      }
    };

    // act
    await day1UseCase(null, presenter, { ...inject, logger });

    // assert
    const { response, error } = expected;
    expect(presenter.getPresentSuccessCallInput()).toStrictEqual(response);
    expect(presenter.getPresentFailCallInput()).toStrictEqual(error);
  });
});
