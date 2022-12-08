import day8 from './index';

const INPUT = `30373
25512
65332
33549
35390`;

describe('On Day 5', () => {
  it(`part1 is correct`, () => {
    expect(day8.solveForPartOne(INPUT)).toBe('21');
  });

  it(`part2 is correct`, () => {
    expect(day8.solveForPartTwo(INPUT)).toBe('8');
  });
});
