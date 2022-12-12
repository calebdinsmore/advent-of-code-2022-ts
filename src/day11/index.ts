import { Day } from '../day';

const OPERATORS: { [key: string]: (a: number, b: number) => number } = {
  '*': (a: number, b: number) => a * b,
  '+': (a: number, b: number) => a + b,
};

const MONKEY_RE =
  /Monkey (?<monkeyNum>\d+):\n. Starting items: (?<items>.*)\n  Operation: new = old (?<operator>.) (?<operand>.+)\n. Test: divisible by (?<divisibleBy>\d+)\n.   If true: throw to monkey (?<trueMonkey>\d+)\n.   If false: throw to monkey (?<falseMonkey>\d+)/gm;

class Monkey {
  inspectionCount = 0;

  constructor(
    public monkeyNum: number,
    private items: number[],
    private operation: (item: number) => number,
    private test: (item: number) => boolean,
    private worryReducer: (item: number) => number,
    private trueMonkey: number,
    private falseMonkey: number
  ) {}

  static fromRegexMatch(match: RegExpMatchArray, worryReducer: (item: number) => number): Monkey {
    const { monkeyNum, items, divisibleBy, operator, operand, trueMonkey, falseMonkey } = match.groups!;
    const operation = (item: number) => {
      if (operand === 'old') {
        return OPERATORS[operator](item, item);
      } else {
        return OPERATORS[operator](item, parseInt(operand));
      }
    };
    const test = (item: number) => {
      return item % parseInt(divisibleBy) === 0;
    };
    return new Monkey(
      parseInt(monkeyNum),
      items.split(', ').map((i) => parseInt(i)),
      operation,
      test,
      worryReducer,
      parseInt(trueMonkey),
      parseInt(falseMonkey)
    );
  }

  catchItem(item: number) {
    this.items.push(item);
  }

  *nextThrownItem(): Generator<[number, number]> {
    while (this.items.length > 0) {
      this.inspectionCount++;
      const changedItem = this.operation(this.items.splice(0, 1)[0]);
      const adjusted = this.worryReducer(changedItem);
      if (this.test(adjusted)) {
        yield [adjusted, this.trueMonkey];
      } else {
        yield [adjusted, this.falseMonkey];
      }
    }
  }
}

class Day11 extends Day {
  constructor() {
    super(11);
  }

  solveForPartOne(input: string): string {
    const matches = input.matchAll(MONKEY_RE);
    const monkeyMap: { [key: number]: Monkey } = {};
    for (const match of matches) {
      const monkey = Monkey.fromRegexMatch(match, (i) => Math.floor(i / 3));
      monkeyMap[monkey.monkeyNum] = monkey;
    }

    for (let round = 0; round < 20; round++) {
      for (const monkey of Object.values(monkeyMap)) {
        for (const [item, thrownTo] of monkey.nextThrownItem()) {
          monkeyMap[thrownTo].catchItem(item);
        }
      }
    }
    const inspectionCounts = Object.values(monkeyMap).map((m) => m.inspectionCount);
    inspectionCounts.sort((a, b) => b - a);
    const result = inspectionCounts[0] * inspectionCounts[1];
    return result.toString();
  }

  solveForPartTwo(input: string): string {
    const matches = input.matchAll(MONKEY_RE);
    const monkeyMap: { [key: number]: Monkey } = {};
    for (const match of matches) {
      const divisor = 19 * 13 * 5 * 7 * 17 * 2 * 3 * 11;
      const monkey = Monkey.fromRegexMatch(match, (i) => i % divisor);
      monkeyMap[monkey.monkeyNum] = monkey;
    }

    for (let round = 0; round < 10_000; round++) {
      for (const monkey of Object.values(monkeyMap)) {
        for (const [item, thrownTo] of monkey.nextThrownItem()) {
          monkeyMap[thrownTo].catchItem(item);
        }
      }
    }
    const inspectionCounts = Object.values(monkeyMap).map((m) => m.inspectionCount);
    inspectionCounts.sort((a, b) => b - a);
    const result = inspectionCounts[0] * inspectionCounts[1];
    return result.toString();
  }
}

export default new Day11();
