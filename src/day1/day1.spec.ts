import day1 from './index';

const INPUT = `1000
2000
3000

4000

5000
6000

7000
8000
9000

10000`

describe('On Day 1', () =>{
    it('part1 returns thiccest elf', ()=>{
        expect(day1.solveForPartOne(INPUT)).toBe('24000');
    })

    it('part2 returns three thiccest elves', () => {
        expect(day1.solveForPartTwo(INPUT)).toBe('45000');
    })
});