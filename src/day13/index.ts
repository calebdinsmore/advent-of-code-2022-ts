import assert from 'assert';
import { Day } from '../day';

class Day13 extends Day {
  constructor() {
    super(13);
  }

  solveForPartOne(input: string): string {
    const pairsRaw = input.split('\n\n').map((p) => p.split('\n'));
    const parsedPairs = pairsRaw.map((pair) => pair.map((l) => eval(l)));
    const orderingResults = parsedPairs.map((pair, index) =>
      isRightOrder(pair[0], pair[1]) ? index + 1 : 0
    );
    return orderingResults.reduce((a, b) => a + b).toString();
  }

  solveForPartTwo(input: string): string {
    const pairsRaw = input
      .split('\n\n')
      .map((p) => p.split('\n'))
      .flat();
    const parsedLists = pairsRaw.map((line) => eval(line));
    const decoderA = [[2]];
    const decoderB = [[6]];
    parsedLists.push(decoderA);
    parsedLists.push(decoderB);
    parsedLists.sort((a, b) => {
      return isRightOrder(a, b) ? -1 : 1;
    });
    const decoderAIdx = parsedLists.indexOf(decoderA) + 1;
    const decoderBIdx = parsedLists.indexOf(decoderB) + 1;
    return (decoderAIdx * decoderBIdx).toString();
  }
}

function isRightOrder(left: any[], right: any[]): boolean | undefined {
  const maxLength = Math.max(left.length, right.length);
  for (let i = 0; i < maxLength; i++) {
    const subLeft = left[i];
    const subRight = right[i];
    // console.log(subLeft, subRight);
    if (subLeft === undefined) return true;
    if (subRight === undefined) return false;
    if (Number.isInteger(subLeft) && Number.isInteger(subRight)) {
      if (subLeft < subRight) return true;
      if (subLeft > subRight) return false;
    } else if (Array.isArray(subLeft) && Array.isArray(subRight)) {
      const result = isRightOrder(subLeft, subRight);
      if (result !== undefined) return result;
    } else if (Array.isArray(subLeft) && Number.isInteger(subRight)) {
      const result = isRightOrder(subLeft, [subRight]);
      if (result !== undefined) return result;
    } else if (Number.isInteger(subLeft) && Array.isArray(subRight)) {
      const result = isRightOrder([subLeft], subRight);
      if (result !== undefined) return result;
    }
  }
}

export default new Day13();
