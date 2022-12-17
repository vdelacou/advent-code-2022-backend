export const UPPER_CASE_CHARACTER = <const>['A', 'B', 'C', 'D', 'E',
  'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O',
  'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

type UpperCaseCharacter = typeof UPPER_CASE_CHARACTER[number];
export type Character = UpperCaseCharacter | Lowercase<UpperCaseCharacter>;

export interface GetDay3Part1PuzzleOuput {
  rucksacks: {
    firstCompartment: {
      itemName: Character;
    }[],
    secondCompartment: {
      itemName: Character;
    }[]
  }[]
}

export interface GetDay3Part2PuzzleOuput {
  groups: {
    firstRuckSack: {
      itemName: Character;
    }[],
    secondRuckSack: {
      itemName: Character;
    }[],
    thirdRuckSack: {
      itemName: Character;
    }[]
  }[]
}

export type GetDay3PuzzleError = null
