import day7 from './index';

const INPUT = `$ cd /
$ ls
dir a
14848514 b.txt
8504156 c.dat
dir d
$ cd a
$ ls
dir e
29116 f
2557 g
62596 h.lst
$ cd e
$ ls
584 i
$ cd ..
$ cd ..
$ cd d
$ ls
4060174 j
8033020 d.log
5626152 d.ext
7214296 k`;

describe('On Day 5', () => {
  it(`part1 is correct`, () => {
    expect(day7.solveForPartOne(INPUT)).toBe('95437');
  });

  it(`part2 is correct`, () => {
    expect(day7.solveForPartTwo(INPUT)).toBe('24933642');
  });
});
