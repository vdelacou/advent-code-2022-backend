import { getFakeLogger } from 'app-core/common/__tests__/fake-logger';
import { fakePresenter } from 'app-core/common/__tests__/fake-presenter';
import { Day6Error } from 'app-core/port/api/day6/error';
import { Day6Response } from 'app-core/port/api/day6/response';
import { GetDay6Part1PuzzleOuput, GetDay6PuzzleError } from 'app-core/port/infra/storage/day6/dto/get-input-puzzle';
import { createFail, createSuccess, Result } from 'common/interface/result';
import { TestExpectedResult } from 'common/interface/test/test-expected-result';
import { Day6UseCaseInject, day6UseCasePart1 } from '../part1';

interface TestExpectedResultInput {
  getDay6Part1Puzzle: () => Promise<Result<GetDay6Part1PuzzleOuput, GetDay6PuzzleError>>;
}
interface TestExpectedResultExpected {
  response?: Day6Response;
  error?: Day6Error;
}

const testExpectedResultsPart1: TestExpectedResult<TestExpectedResultInput, TestExpectedResultExpected>[] = [
  {
    title: 'Return error when infra error',
    input: {
      getDay6Part1Puzzle: async () => createFail(null)
    },
    expected: {
      error: { type: 'INFRA_ERROR' }
    }
  },
  {
    title: 'First Example',
    input: {
      getDay6Part1Puzzle: async () => createSuccess({
        buffer: 'mjqjpqmgbljsphdztnvjfqwrcgsmlb'
      })
    },
    expected: {
      response: { result: 7 }
    }
  },
  {
    title: 'Second Example',
    input: {
      getDay6Part1Puzzle: async () => createSuccess({
        buffer: 'bvwbjplbgvbhsrlpgdmjqwftvncz'
      })
    },
    expected: {
      response: { result: 5 }
    }
  },
  {
    title: 'Third Example',
    input: {
      getDay6Part1Puzzle: async () => createSuccess({
        buffer: 'nppdvjthqldpwncqszvftbrmjlhg'
      })
    },
    expected: {
      response: { result: 6 }
    }
  },
  {
    title: 'Fourth Example',
    input: {
      getDay6Part1Puzzle: async () => createSuccess({
        buffer: 'nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg'
      })
    },
    expected: {
      response: { result: 10 }
    }
  },
  {
    title: 'Fivth Example',
    input: {
      getDay6Part1Puzzle: async () => createSuccess({
        buffer: 'zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw'
      })
    },
    expected: {
      response: { result: 11 }
    }
  }
];

describe('Day6 Test Part 1', async () => {
  it.each(testExpectedResultsPart1)('Day6 Part 1 with arguments %p', async (testExpectedResult) => {
    // arrange
    const { input, expected } = testExpectedResult;
    const presenter = fakePresenter<Day6Response, Day6Error>();
    const logger = getFakeLogger();
    const inject: Day6UseCaseInject = { day6Storage: { getDay6Part1Puzzle: input.getDay6Part1Puzzle } };

    // act
    await day6UseCasePart1(null, presenter, { ...inject, logger });

    // assert
    const { response, error } = expected;
    expect(presenter.getPresentSuccessCallInput()).toStrictEqual(response);
    expect(presenter.getPresentFailCallInput()).toStrictEqual(error);
  });
});
