import { Day } from '../day';

class Day5 extends Day {
  constructor() {
    super(5);
  }

  solveForPartOne(input: string): string {
    const [stackString, instructions] = input.split('\n\n');
    const stackLayers = stackString.split('\n');
    const numStacks = Math.round(stackLayers[0].length / 4);
    const stacks: string[][] = Array.from({ length: numStacks }, () => []);
    for (const layer of stackLayers.slice(0, -1)) {
      let stack = -1;
      for (let i = 0; i < layer.length; i += 3) {
        stack++;
        if (layer.slice(i, i + 3).trim() === '') {
          i++;
          continue;
        }
        stacks[stack].push(layer[i + 1]);
        i++;
      }
    }
    const instructionsArray = instructions.split('\n');
    for (const instruction of instructionsArray) {
      const re = /move (\d+) from (\d+) to (\d+)/;
      const [amount, source, dest] = instruction
        .match(re)!
        .splice(1, 4)
        .map((num) => parseInt(num));
      for (let i = 0; i < amount; i++) {
        const object = stacks[source - 1].splice(0, 1)[0];
        stacks[dest - 1] = [object, ...stacks[dest - 1]];
      }
    }
    return stacks.map((stack) => stack[0]).join('');
  }

  solveForPartTwo(input: string): string {
    const [stackString, instructions] = input.split('\n\n');
    const stackLayers = stackString.split('\n');
    const numStacks = Math.round(stackLayers[0].length / 4);
    const stacks: string[][] = Array.from({ length: numStacks }, () => []);
    for (const layer of stackLayers.slice(0, -1)) {
      let stack = -1;
      for (let i = 0; i < layer.length; i += 3) {
        stack++;
        if (layer.slice(i, i + 3).trim() === '') {
          i++;
          continue;
        }
        stacks[stack].push(layer[i + 1]);
        i++;
      }
    }
    const instructionsArray = instructions.split('\n');
    for (const instruction of instructionsArray) {
      const re = /move (\d+) from (\d+) to (\d+)/;
      const [amount, source, dest] = instruction
        .match(re)!
        .splice(1, 4)
        .map((num) => parseInt(num));
      const objects = stacks[source - 1].splice(0, amount);
      stacks[dest - 1] = [...objects, ...stacks[dest - 1]];
    }
    return stacks.map((stack) => stack[0]).join('');
  }
}

export default new Day5();
