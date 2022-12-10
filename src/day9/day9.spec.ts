import day9 from './index';

const INPUT = `R 4
U 4
L 3
D 1
R 4
D 1
L 5
R 2`;

describe('On Day 5', () => {
  it(`part1 is correct`, () => {
    expect(day9.solveForPartOne(INPUT)).toBe('13');
  });

  it(`part2 is correct`, () => {
    expect(
      day9.solveForPartTwo(`R 5
U 8
L 8
D 3
R 17
D 10
L 25
U 20`)
    ).toBe('36');
  });
});
