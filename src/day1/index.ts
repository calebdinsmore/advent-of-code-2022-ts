import { Day } from '../day';

class Day1 extends Day {
  constructor() {
    super(1);
  }

  solveForPartOne(input: string): string {
    return this.sortedCalorieSums(input).at(0)!.toString();
  }

  solveForPartTwo(input: string): string {
    return this.sortedCalorieSums(input)
      .slice(0, 3)
      .reduce((a, c) => a + c)!
      .toString();
  }

  private sortedCalorieSums(input: string): number[] {
    const groups = input.split('\n\n');
    const sums = groups.map((group) =>
      group
        .split('\n')
        .map((num) => parseInt(num))
        .reduce((acc, current) => acc + current)
    );
    sums.sort((a, b) => b-a);
    return sums;
  }
}

export default new Day1();
