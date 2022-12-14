import day13 from './index';

const INPUT = `[1,1,3,1,1]
[1,1,5,1,1]

[[1],[2,3,4]]
[[1],4]

[9]
[[8,7,6]]

[[4,4],4,4]
[[4,4],4,4,4]

[7,7,7,7]
[7,7,7]

[]
[3]

[[[]]]
[[]]

[1,[2,[3,[4,[5,6,7]]]],8,9]
[1,[2,[3,[4,[5,6,0]]]],8,9]`;

describe('On Day 5', () => {
  it(`part1 is correct`, () => {
    expect(day13.solveForPartOne(INPUT)).toBe('13');
  });

  it(`part2 is correct`, () => {
    expect(day13.solveForPartTwo(INPUT)).toBe('140');
  });
});
