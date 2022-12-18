export interface GetDay5Part1PuzzleOuput {
  stacks: {
    number: number,
    crates: string[],
  }[],
  moves: {
    fromIndex: number;
    toIndex: number;
    numberToMove: number;
  }[]
}

export type GetDay5PuzzleError = null
