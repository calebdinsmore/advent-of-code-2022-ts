import day12 from './index';

const INPUT = `Sabqponm
abcryxxl
accszExk
acctuvwj
abdefghi`;

describe('On Day 5', () => {
  it(`part1 is correct`, () => {
    expect(day12.solveForPartOne(INPUT)).toBe('31');
  });

  it(`part2 is correct`, () => {
    expect(day12.solveForPartTwo(INPUT)).toBe('29');
  });
});
