import { getFakeLogger } from 'app-core/common/__tests__/fake-logger';
import { fakePresenter } from 'app-core/common/__tests__/fake-presenter';
import { Day5Error } from 'app-core/port/api/day5/error';
import { Day5Response } from 'app-core/port/api/day5/response';
import { GetDay5Part1PuzzleOuput, GetDay5PuzzleError } from 'app-core/port/infra/storage/day5/dto/get-input-puzzle';
import { createFail, createSuccess, Result } from 'common/interface/result';
import { TestExpectedResult } from 'common/interface/test/test-expected-result';
import { Day5UseCaseInject } from '../part1';
import { day5UseCasePart2 } from '../part2';

interface TestExpectedResultInput {
  getDay5Part1Puzzle: () => Promise<Result<GetDay5Part1PuzzleOuput, GetDay5PuzzleError>>;
}
interface TestExpectedResultExpected {
  response?: Day5Response;
  error?: Day5Error;
}

const testExpectedResultsPart1: TestExpectedResult<TestExpectedResultInput, TestExpectedResultExpected>[] = [
  {
    title: 'Return error when infra error',
    input: {
      getDay5Part1Puzzle: async () => createFail(null)
    },
    expected: {
      error: { type: 'INFRA_ERROR' }
    }
  },
  {
    title: 'With wrong number stack',
    input: {
      getDay5Part1Puzzle: async () => createSuccess({
        stacks: [
          { number: 1, crates: ['N', 'Z'] },
          { number: 2, crates: [] }
        ],
        moves: [
          { numberToMove: 1, fromIndex: 1, toIndex: 5 }
        ]
      })
    },
    expected: {
      response: { result: 'N' }
    }
  },
  {
    title: 'With both wrong number stack',
    input: {
      getDay5Part1Puzzle: async () => createSuccess({
        stacks: [
          { number: 1, crates: ['N', 'Z'] },
          { number: 2, crates: [] }
        ],
        moves: [
          { numberToMove: 1, fromIndex: 6, toIndex: 5 }
        ]
      })
    },
    expected: {
      response: { result: 'N' }
    }
  },
  {
    title: '2 stacks, two crates, one one_line_with_one_move',
    input: {
      getDay5Part1Puzzle: async () => createSuccess({
        stacks: [
          { number: 1, crates: ['N', 'Z'] },
          { number: 2, crates: [] }
        ],
        moves: [
          { numberToMove: 1, fromIndex: 1, toIndex: 2 }
        ]
      })
    },
    expected: {
      response: { result: 'ZN' }
    }
  },
  {
    title: 'example first move',
    input: {
      getDay5Part1Puzzle: async () => createSuccess({
        stacks: [
          { number: 1, crates: ['N', 'Z'] },
          { number: 2, crates: ['D', 'C', 'M'] },
          { number: 3, crates: ['P'] }
        ],
        moves: [{ numberToMove: 1, fromIndex: 2, toIndex: 1 }]
      })
    },
    expected: {
      response: { result: 'DCP' }
    }
  },
  {
    title: 'example two move',
    input: {
      getDay5Part1Puzzle: async () => createSuccess({
        stacks: [
          { number: 1, crates: ['N', 'Z'] },
          { number: 2, crates: ['D', 'C', 'M'] },
          { number: 3, crates: ['P'] }
        ],
        moves: [
          { numberToMove: 1, fromIndex: 2, toIndex: 1 },
          { numberToMove: 3, fromIndex: 1, toIndex: 3 }
        ]
      })
    },
    expected: {
      response: { result: 'CD' }
    }
  },
  {
    title: 'example three moves',
    input: {
      getDay5Part1Puzzle: async () => createSuccess({
        stacks: [
          { number: 1, crates: ['N', 'Z'] },
          { number: 2, crates: ['D', 'C', 'M'] },
          { number: 3, crates: ['P'] }
        ],
        moves: [
          { numberToMove: 1, fromIndex: 2, toIndex: 1 },
          { numberToMove: 3, fromIndex: 1, toIndex: 3 },
          { numberToMove: 2, fromIndex: 2, toIndex: 1 }
        ]
      })
    },
    expected: {
      response: { result: 'CD' }
    }
  },
  {
    title: 'example 4 moves',
    input: {
      getDay5Part1Puzzle: async () => createSuccess({
        stacks: [
          { number: 1, crates: ['N', 'Z'] },
          { number: 2, crates: ['D', 'C', 'M'] },
          { number: 3, crates: ['P'] }
        ],
        moves: [
          { numberToMove: 1, fromIndex: 2, toIndex: 1 },
          { numberToMove: 3, fromIndex: 1, toIndex: 3 },
          { numberToMove: 2, fromIndex: 2, toIndex: 1 },
          { numberToMove: 1, fromIndex: 1, toIndex: 2 }
        ]
      })
    },
    expected: {
      response: { result: 'MCD' }
    }
  }
];

describe('Day5 Test Part 1', async () => {
  it.each(testExpectedResultsPart1)('Day5 Part 1 with arguments %p', async (testExpectedResult) => {
    // arrange
    const { input, expected } = testExpectedResult;
    const presenter = fakePresenter<Day5Response, Day5Error>();
    const logger = getFakeLogger();
    const inject: Day5UseCaseInject = { day5Storage: { getDay5Part1Puzzle: input.getDay5Part1Puzzle } };

    // act
    await day5UseCasePart2(null, presenter, { ...inject, logger });

    // assert
    const { response, error } = expected;
    expect(presenter.getPresentSuccessCallInput()).toStrictEqual(response);
    expect(presenter.getPresentFailCallInput()).toStrictEqual(error);
  });
});
