import { Day } from '../day';
import _ from 'lodash';

class Day3 extends Day {
  constructor() {
    super(3);
  }

  solveForPartOne(input: string): string {
    const sacks = input.split('\n');
    let sum = 0;
    for (const sack of sacks) {
      const c1 = sack.slice(0, sack.length / 2).split('');
      const c2 = sack.slice(sack.length / 2).split('');
      const intersection = _.intersection(c1, c2)[0];
      sum += this.priority(intersection);
    }

    return sum.toString();
  }

  solveForPartTwo(input: string): string {
    const sacks = input.split('\n');
    let sum = 0;
    for (let i = 0; i < sacks.length; i += 3) {
      const groups = sacks.slice(i, i + 3).map((sack) => sack.split(''));
      const intersection = _.intersection(...groups)[0];
      sum += this.priority(intersection);
    }

    return sum.toString();
  }

  private priority(letter: string): number {
    const alphabetLower = 'abcdefghijklmnopqrstuvwxyz';
    if (alphabetLower.includes(letter)) {
      return alphabetLower.indexOf(letter) + 1;
    } else {
      return alphabetLower.indexOf(letter.toLowerCase()) + 27;
    }
  }
}

export default new Day3();
