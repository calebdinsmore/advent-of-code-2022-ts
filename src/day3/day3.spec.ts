import day3 from './index';
const INPUT = `vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw`;

describe('On Day 3', () => {
  it(`part1 is correct`, () => {
    expect(day3.solveForPartOne(INPUT)).toBe('157');
  });

  it(`part1 is correct`, () => {
    expect(day3.solveForPartTwo(INPUT)).toBe('70');
  });
});
