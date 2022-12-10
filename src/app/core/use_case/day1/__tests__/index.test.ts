import { getFakeLogger } from 'app-core/common/__tests__/fake-logger';
import { fakePresenter } from 'app-core/common/__tests__/fake-presenter';
import { Day1Error } from 'app-core/port/api/day1/error';
import { Day1Response } from 'app-core/port/api/day1/response';
import { GetDay1PuzzleError, GetDay1PuzzleOuput } from 'app-core/port/infra/storage/day1/dto/get-day1-puzzle';
import { makeSuccess, Result } from 'common/interface/result';
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
    title: 'Only one number and one elf',
    input: {
      getDay1Puzzle: async () => makeSuccess({ elf: [{ calories: [1] }] })
    },
    expected: {
      response: { mostCalories: 1 }
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
