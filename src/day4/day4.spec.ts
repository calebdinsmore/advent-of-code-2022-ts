import day4 from './index';

const INPUT = `2-4,6-8
2-3,4-5
5-7,7-9
2-8,3-7
6-6,4-6
2-6,4-8`;

describe('On Day 4', () => {
  it(`part1 is correct`, () => {
    expect(day4.solveForPartOne(INPUT)).toBe('2');
  });

  it(`part2 is correct`, () => {
    expect(day4.solveForPartTwo(INPUT)).toBe('4');
  });
});
