import assert from 'assert';
import { Day } from '../day';

const directionMap: { [key: string]: (coords: number[]) => number[] } = {
  R: (coords) => [coords[0] + 1, coords[1]],
  L: (coords) => [coords[0] - 1, coords[1]],
  U: (coords) => [coords[0], coords[1] + 1],
  D: (coords) => [coords[0], coords[1] - 1],
};

function distance(c1: number, c2: number): number {
  return Math.sqrt((c1 - c2) ** 2);
}

class Knot {
  head?: Knot;
  tail?: Knot;
  coords: number[] = [0, 0];
  visited: Set<string> = new Set(['0,0']);

  constructor(head?: Knot) {
    this.head = head;
  }

  move(direction: string, num: number) {
    for (let i = 0; i < num; i++) {
      this.coords = directionMap[direction](this.coords);
      this.tail?.calculateNewPositionFromHeadMovement();
    }
  }

  visualize() {
    const grid: string[][] = Array.from({ length: 35 }, () =>
      Array.from({ length: 35 }).fill(' ')
    ) as string[][];
    let head: Knot = this;
    grid[20 - head.coords[1]][head.coords[0] + 20] = 'X';
    while (head.tail) {
      head = head.tail;
      grid[20 - head.coords[1]][head.coords[0] + 20] = 'X';
    }
    const vis = grid.map((a) => a.join('')).join('\n');
    console.log(vis);
  }

  calculateNewPositionFromHeadMovement() {
    assert(this.head);
    const [headX, headY] = this.head.coords;
    const [myX, myY] = this.coords;

    if (headX === myX) {
      if (distance(headY, myY) === 2) {
        this.coords[1] = Math.max(headY, myY) - 1;
        this.visited.add(this.coords.join(','));
      }
    } else if (headY === myY) {
      if (distance(headX, myX) === 2) {
        this.coords[0] = Math.max(headX, myX) - 1;
        this.visited.add(this.coords.join(','));
      }
    } else if (distance(headX, myX) === 2 && distance(headY, myY) === 2) {
      // diagonal
      this.coords[0] = Math.max(headX, myX) - 1;
      this.coords[1] = Math.max(headY, myY) - 1;
      this.visited.add(this.coords.join(','));
    } else {
      if (distance(headX, myX) === 2) {
        this.coords[0] = Math.max(headX, myX) - 1;
        this.coords[1] = headY;
        this.visited.add(this.coords.join(','));
      } else if (distance(headY, myY) === 2) {
        this.coords[0] = headX;
        this.coords[1] = Math.max(headY, myY) - 1;
        this.visited.add(this.coords.join(','));
      }
    }

    this.tail?.calculateNewPositionFromHeadMovement();
  }
}

class Day9 extends Day {
  constructor() {
    super(9);
  }

  solveForPartOne(input: string): string {
    const firstKnot = this.buildRope(2);
    const instructions = input.split('\n').map((l) => l.split(' '));
    for (const [direction, number] of instructions) {
      firstKnot.move(direction, parseInt(number));
    }
    return firstKnot.tail!.visited.size.toString();
  }

  solveForPartTwo(input: string): string {
    const firstKnot = this.buildRope(10);
    const instructions = input.split('\n').map((l) => l.split(' '));
    for (const [direction, number] of instructions) {
      firstKnot.move(direction, parseInt(number));
    }
    let knot: Knot = firstKnot;
    while (knot.tail) {
      knot = knot.tail;
    }
    return knot.visited.size.toString();
  }

  /**
   * Builds a rope of Knots
   * @param {number} numKnots - number of knots in the rope
   * @returns the first knot
   */
  private buildRope(numKnots: number): Knot {
    const ropeHead = new Knot();
    let head = ropeHead;
    for (let i = 0; i < numKnots - 1; i++) {
      head.tail = new Knot(head);
      head = head.tail;
    }
    return ropeHead;
  }
}

export default new Day9();
