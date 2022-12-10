import { Day } from '../day';

function distance(c1: number, c2: number): number {
  return Math.sqrt((c1 - c2) ** 2);
}

/**
 * Map of instructions that perform ops and return the result and the number of cycles taken
 * to complete
 */
const instructions: { [key: string]: (...args: number[]) => [number, number] } = {
  addx: (V: number, register: number) => [V + register, 2],
  noop: (_, register: number) => [register, 1],
};

class CpuCrt {
  X = 1;
  currentWorkCycles = 0;
  currentCycle = 1;
  signalLog: number[] = [];
  crtScreen = Array.from({ length: 6 }, () => Array.from({ length: 40 }).fill('.'));

  execute(instruction: string, ...args: number[]) {
    const [newX, cycles] = instructions[instruction](args[0], this.X);
    this.currentWorkCycles = cycles;
    while (this.currentWorkCycles > 0) {
      this.logSignalStrength();
      this.drawToCrt();
      this.currentWorkCycles--;
      this.currentCycle++;
    }
    this.X = newX;
  }

  private drawToCrt() {
    const row = Math.floor((this.currentCycle - 1) / 40);
    const column = (this.currentCycle - 1) % 40;
    if (distance(this.X, column) <= 1) {
      this.crtScreen[row][column] = '#';
    }
  }

  private logSignalStrength() {
    if (this.currentCycle === 20 || (this.currentCycle - 20) % 40 === 0) {
      this.signalLog.push(this.X * this.currentCycle);
    }
  }
}

class Day10 extends Day {
  constructor() {
    super(10);
  }

  solveForPartOne(input: string): string {
    const instructions = input.split('\n').map((a) => a.split(' '));
    const cpu = new CpuCrt();
    for (const [instruction, arg] of instructions) {
      const parsedArg = parseInt(arg ?? '0');
      cpu.execute(instruction, parsedArg);
    }
    return cpu.signalLog.reduce((a, b) => a + b).toString();
  }

  solveForPartTwo(input: string): string {
    const instructions = input.split('\n').map((a) => a.split(' '));
    const cpu = new CpuCrt();
    for (const [instruction, arg] of instructions) {
      const parsedArg = parseInt(arg ?? '0');
      cpu.execute(instruction, parsedArg);
    }
    return cpu.crtScreen.map((r) => r.join('')).join('\n');
  }
}

export default new Day10();
