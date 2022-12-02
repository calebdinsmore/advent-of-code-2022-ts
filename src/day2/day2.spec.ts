import day2 from './index';

const INPUT = `A Y
B X
C Z`

describe('On Day 2', () =>{
    it(`part1 returns correct score`, ()=>{
        expect(day2.solveForPartOne(INPUT)).toBe('15');
    })

    it(`part1 returns correct score`, ()=>{
        expect(day2.solveForPartTwo(INPUT)).toBe('12');
    })
});