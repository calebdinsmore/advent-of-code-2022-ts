import _, { over } from 'lodash';
import { Day } from '../day';

function range(start: number, stop?: number, step?: number) {
  if (typeof stop == 'undefined') {
    // one param defined
    stop = start;
    start = 0;
  }

  if (typeof step == 'undefined') {
    step = 1;
  }

  if ((step > 0 && start >= stop) || (step < 0 && start <= stop)) {
    return [];
  }

  var result: number[] = [];
  for (let i = start; step > 0 ? i < stop : i > stop; i += step) {
    result.push(i);
  }

  return result;
}

class Day4 extends Day {
  constructor() {
    super(4);
  }

  solveForPartOne(input: string): string {
    const pairs = input.split('\n');
    let overlaps = 0;
    for (const pair of pairs) {
      const [e1, e2] = pair.split(',');
      const parsedE1 = e1.split('-').map((num) => parseInt(num));
      const parsedE2 = e2.split('-').map((num) => parseInt(num));
      if (
        (parsedE1[0] <= parsedE2[0] && parsedE1[1] >= parsedE2[1]) ||
        (parsedE2[0] <= parsedE1[0] && parsedE2[1] >= parsedE1[1])
      ) {
        overlaps++;
      }
    }
    return overlaps.toString();
  }

  solveForPartTwo(input: string): string {
    const pairs = input.split('\n');
    let overlaps = 0;

    for (const pair of pairs) {
      const [e1, e2] = pair.split(',');
      const parsedE1 = e1.split('-').map((num) => parseInt(num));
      const parsedE2 = e2.split('-').map((num) => parseInt(num));
      const fullE1 = range(parsedE1[0], parsedE1[1] + 1);
      const fullE2 = range(parsedE2[0], parsedE2[1] + 1);
      if (_.intersection(fullE1, fullE2).length > 0) {
        overlaps++;
      }
    }
    return overlaps.toString();
  }
}

export default new Day4();
