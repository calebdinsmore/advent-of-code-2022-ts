import day6 from './index';

const INPUT = `mjqjpqmgbljsphdztnvjfqwrcgsmlb`;

describe('On Day 5', () => {
  it(`part1 is correct`, () => {
    expect(day6.solveForPartOne(INPUT)).toBe('7');
  });

  it(`part2 is correct`, () => {
    expect(day6.solveForPartTwo(INPUT)).toBe('19');
  });
});
