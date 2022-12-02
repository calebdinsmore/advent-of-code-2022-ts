import { Day } from '../day';

const SHAPE_SCORE = {
  X: 1,
  Y: 2,
  Z: 3,
};

const BEAT_MAP = {
  A: 'Z',
  B: 'X',
  C: 'Y',
  X: 'C',
  Y: 'A',
  Z: 'B',
};

const DRAW_MAP = {
  A: 'X',
  B: 'Y',
  C: 'Z',
};

class Day2 extends Day {
  constructor() {
    super(2);
  }

  solveForPartOne(input: string): string {
    const matches = input.split('\n');
    let score = 0;
    for (let match of matches) {
      const [opp, you] = match.split(' ');

      if (BEAT_MAP[opp] === you) {
        score += SHAPE_SCORE[you];
      } else if (BEAT_MAP[you] === opp) {
        score += 6 + SHAPE_SCORE[you];
      } else {
        score += 3 + SHAPE_SCORE[you];
      }
    }
    return score.toString();
  }

  solveForPartTwo(input: string): string {
    const matches = input.split('\n');
    let score = 0;
    for (let match of matches) {
      const [opp, result] = match.split(' ');

      let you: string;
      const beatArray = Object.entries(BEAT_MAP);
      switch (result) {
        case 'X':
          you = beatArray.find((x) => x[0] === opp)![1];
          score += SHAPE_SCORE[you];
          break;
        case 'Y':
          you = DRAW_MAP[opp];
          score += 3 + SHAPE_SCORE[you];
          break;
        case 'Z':
          you = beatArray.find((x) => x[1] === opp)![0];
          score += 6 + SHAPE_SCORE[you];
          break;
        default:
          you = 'X';
      }
    }
    return score.toString();
  }
}

export default new Day2();
