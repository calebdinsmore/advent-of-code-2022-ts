import day14 from './index';

const INPUT = `498,4 -> 498,6 -> 496,6
503,4 -> 502,4 -> 502,9 -> 494,9`;

describe('On Day 5', () => {
  it(`part1 is correct`, () => {
    expect(day14.solveForPartOne(INPUT)).toBe('24');
  });

  it(`part2 is correct`, () => {
    expect(day14.solveForPartTwo(INPUT)).toBe('93');
  });
});
