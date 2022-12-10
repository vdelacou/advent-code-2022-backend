import { GetDay1PuzzleError, GetDay1PuzzleOuput } from 'app-core/port/infra/storage/day1/dto/get-day1-puzzle';
import { TestExpectedResult } from 'common/interface/test/test-expected-result';
import { readFileSync } from 'node:fs';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { getDay1PuzzleImpl } from '..';

interface TestExpectedResultInput {
  textFile: string;
}
interface TestExpectedResultExpected {
  response?: GetDay1PuzzleOuput;
  error?: GetDay1PuzzleError;
}

const testExpectedResults: TestExpectedResult<TestExpectedResultInput, TestExpectedResultExpected>[] = [
  {
    title: 'Only one elf one number',
    input: { textFile: readFileSync(`${dirname(fileURLToPath(import.meta.url))}/data/only_one_elf_one_number.txt`, 'utf8') },
    expected: {
      response: { elf: [{ calories: [6758] }] }
    }
  },
  {
    title: 'Two elfs one number',
    input: { textFile: readFileSync(`${dirname(fileURLToPath(import.meta.url))}/data/two_elf_one_number.txt`, 'utf8') },
    expected: {
      response: { elf: [{ calories: [6758] }, { calories: [7856] }] }
    }
  },
  {
    title: 'Three Elf two number',
    input: { textFile: readFileSync(`${dirname(fileURLToPath(import.meta.url))}/data/three_elf_two_number.txt`, 'utf8') },
    expected: {
      response: { elf: [{ calories: [6758, 5199] }, { calories: [62_522] }, { calories: [4203, 36_288] }] }
    }
  }

];

describe('Get Day1 Puzzle Input Test', async () => {
  it.each(testExpectedResults)('Day1 Puzzel Input with arguments %p', async (testExpectedResult) => {
    // arrange
    const { input, expected } = testExpectedResult;

    // act
    const result = await getDay1PuzzleImpl(input.textFile);

    // assert
    const { response, error } = expected;
    expect(result.data).toStrictEqual(response);
    expect(result.error).toStrictEqual(error);
  });
});
