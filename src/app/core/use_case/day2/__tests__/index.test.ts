import { getFakeLogger } from 'app-core/common/__tests__/fake-logger';
import { fakePresenter } from 'app-core/common/__tests__/fake-presenter';
import { Day2Error } from 'app-core/port/api/day2/error';
import { Day2Response } from 'app-core/port/api/day2/response';
import { GetDay2Part1PuzzleOuput, GetDay2Part2PuzzleOuput, GetDay2PuzzleError } from 'app-core/port/infra/storage/day2/dto/get-day2-puzzle';
import { createFail, createSuccess, Result } from 'common/interface/result';
import { TestExpectedResult } from 'common/interface/test/test-expected-result';
import { Day2UseCaseInject, day2UseCasePart1, day2UseCasePart2 } from '..';

interface TestExpectedResultInput {
  getDay2Part1Puzzle: () => Promise<Result<GetDay2Part1PuzzleOuput, GetDay2PuzzleError>>;
}
interface TestExpectedResultExpected {
  response?: Day2Response;
  error?: Day2Error;
}

const testExpectedResultsPart1: TestExpectedResult<TestExpectedResultInput, TestExpectedResultExpected>[] = [
  {
    title: 'Return error when infra error',
    input: {
      getDay2Part1Puzzle: async () => createFail(null)
    },
    expected: {
      error: { type: 'INFRA_ERROR' }
    }
  },
  {
    title: 'Only one round, opponent play Rock and we play Paper',
    input: {
      getDay2Part1Puzzle: async () => createSuccess({
        rounds: [{
          opponentHand: 'ROCK',
          ourHand: 'PAPER'
        }]
      })
    },
    expected: {
      response: { score: 8 }
    }
  },
  {
    title: 'Check Scissors',
    input: {
      getDay2Part1Puzzle: async () => createSuccess({
        rounds: [
          { opponentHand: 'SCISSORS', ourHand: 'SCISSORS' },
          { opponentHand: 'PAPER', ourHand: 'SCISSORS' },
          { opponentHand: 'ROCK', ourHand: 'SCISSORS' },
          { opponentHand: 'ROCK', ourHand: 'SCISSORS' },
          { opponentHand: 'PAPER', ourHand: 'SCISSORS' }
        ]
      })
    },
    expected: {
      response: { score: 30 }
    }
  },
  {
    title: 'Use the example from the puzzle',
    input: {
      getDay2Part1Puzzle: async () => createSuccess({
        rounds: [{
          opponentHand: 'ROCK',
          ourHand: 'PAPER'
        },
        {
          opponentHand: 'PAPER',
          ourHand: 'ROCK'
        },
        {
          opponentHand: 'SCISSORS',
          ourHand: 'SCISSORS'
        }]
      })
    },
    expected: {
      response: { score: 15 }
    }
  },
  {
    title: 'All the cases',
    input: {
      getDay2Part1Puzzle: async () => createSuccess({
        rounds: [
          { opponentHand: 'ROCK', ourHand: 'ROCK' },
          { opponentHand: 'ROCK', ourHand: 'SCISSORS' },
          { opponentHand: 'ROCK', ourHand: 'PAPER' },
          { opponentHand: 'SCISSORS', ourHand: 'ROCK' },
          { opponentHand: 'SCISSORS', ourHand: 'SCISSORS' },
          { opponentHand: 'SCISSORS', ourHand: 'PAPER' },
          { opponentHand: 'PAPER', ourHand: 'ROCK' },
          { opponentHand: 'PAPER', ourHand: 'SCISSORS' },
          { opponentHand: 'PAPER', ourHand: 'PAPER' }
        ]
      })
    },
    expected: {
      response: { score: 45 }
    }
  }
];

describe('Day2 Test Part 1', async () => {
  it.each(testExpectedResultsPart1)('Day2 Part 1 with arguments %p', async (testExpectedResult) => {
    // arrange
    const { input, expected } = testExpectedResult;
    const presenter = fakePresenter<Day2Response, Day2Error>();
    const logger = getFakeLogger();
    const inject: Day2UseCaseInject = { day2Storage: { getDay2Part1Puzzle: input.getDay2Part1Puzzle, getDay2Part2Puzzle: async () => createFail(null) } };

    // act
    await day2UseCasePart1(null, presenter, { ...inject, logger });

    // assert
    const { response, error } = expected;
    expect(presenter.getPresentSuccessCallInput()).toStrictEqual(response);
    expect(presenter.getPresentFailCallInput()).toStrictEqual(error);
  });
});

interface TestPart2ExpectedResultInput {
  getDay2Part2Puzzle: () => Promise<Result<GetDay2Part2PuzzleOuput, GetDay2PuzzleError>>;
}

const testExpectedResultsPart2: TestExpectedResult<TestPart2ExpectedResultInput, TestExpectedResultExpected>[] = [
  {
    title: 'Return error when infra error',
    input: {
      getDay2Part2Puzzle: async () => createFail(null)
    },
    expected: {
      error: { type: 'INFRA_ERROR' }
    }
  },
  {
    title: 'In the first round, your opponent will choose Rock (A), and you need the round to end in a draw (Y), so you also choose Rock. This gives you a score of 1 + 3 = 4.',
    input: {
      getDay2Part2Puzzle: async () => createSuccess({
        rounds: [{
          opponentHand: 'ROCK',
          result: 'DRAW'
        }]
      })
    },
    expected: {
      response: { score: 4 }
    }
  },
  {
    title: 'In the second round, your opponent will choose Paper (B), and you choose Rock so you lose (X) with a score of 1 + 0 = 1.',
    input: {
      getDay2Part2Puzzle: async () => createSuccess({
        rounds: [{
          opponentHand: 'PAPER',
          result: 'LOOSE'
        }]
      })
    },
    expected: {
      response: { score: 1 }
    }
  },
  {
    title: 'In the third round, you will defeat your opponent`s Scissors with Rock for a score of 1 + 6 = 7.',
    input: {
      getDay2Part2Puzzle: async () => createSuccess({
        rounds: [{
          opponentHand: 'SCISSORS',
          result: 'WIN'
        }]
      })
    },
    expected: {
      response: { score: 7 }
    }
  },
  {
    title: 'Check Scissors',
    input: {
      getDay2Part2Puzzle: async () => createSuccess({
        rounds: [
          { opponentHand: 'SCISSORS', result: 'WIN' },
          { opponentHand: 'SCISSORS', result: 'DRAW' },
          { opponentHand: 'SCISSORS', result: 'LOOSE' }
        ]
      })
    },
    expected: {
      response: { score: 15 }
    }
  },
  {
    title: 'All together you would get a total score of 12',
    input: {
      getDay2Part2Puzzle: async () => createSuccess({
        rounds: [
          {
            opponentHand: 'ROCK',
            result: 'DRAW'
          },
          {
            opponentHand: 'PAPER',
            result: 'LOOSE'
          },
          {
            opponentHand: 'SCISSORS',
            result: 'WIN'
          }]
      })
    },
    expected: {
      response: { score: 12 }
    }
  },
  {
    title: 'All Possibilities',
    input: {
      getDay2Part2Puzzle: async () => createSuccess({
        rounds: [
          { opponentHand: 'ROCK', result: 'WIN' },
          { opponentHand: 'ROCK', result: 'DRAW' },
          { opponentHand: 'ROCK', result: 'LOOSE' },
          { opponentHand: 'SCISSORS', result: 'WIN' },
          { opponentHand: 'SCISSORS', result: 'DRAW' },
          { opponentHand: 'SCISSORS', result: 'LOOSE' },
          { opponentHand: 'PAPER', result: 'WIN' },
          { opponentHand: 'PAPER', result: 'DRAW' },
          { opponentHand: 'PAPER', result: 'LOOSE' }
        ]
      })
    },
    expected: {
      response: { score: 45 }
    }
  }
];

describe('Day2 Test Part 2', async () => {
  it.each(testExpectedResultsPart2)('Day2 Part 2 with arguments %p', async (testExpectedResult) => {
    // arrange
    const { input, expected } = testExpectedResult;
    const presenter = fakePresenter<Day2Response, Day2Error>();
    const logger = getFakeLogger();
    const inject: Day2UseCaseInject = { day2Storage: { getDay2Part1Puzzle: async () => createFail(null), getDay2Part2Puzzle: input.getDay2Part2Puzzle } };

    // act
    await day2UseCasePart2(null, presenter, { ...inject, logger });

    // assert
    const { response, error } = expected;
    expect(presenter.getPresentSuccessCallInput()).toStrictEqual(response);
    expect(presenter.getPresentFailCallInput()).toStrictEqual(error);
  });
});
