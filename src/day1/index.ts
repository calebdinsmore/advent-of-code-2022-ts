import { Day } from '../day';

class Day1 extends Day {
  constructor() {
    super(1);
  }

  solveForPartOne(input: string): string {
    const groups = input.split('\n\n');
    const sums = groups.map((group) =>
      group
        .split('\n')
        .map((num) => parseInt(num))
        .reduce((acc, current) => acc + current)
    );
    sums.sort();
    return sums.at(-1)!.toString();
  }

  solveForPartTwo(input: string): string {
    const groups = input.split('\n\n');
    const sums = groups.map((group) =>
      group
        .split('\n')
        .map((num) => parseInt(num))
        .reduce((acc, current) => acc + current)
    );
    sums.sort();
    return sums
      .slice(-3)
      .reduce((a, c) => a + c)!
      .toString();
  }
}

export default new Day1();
