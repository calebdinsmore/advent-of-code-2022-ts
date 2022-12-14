import { writeFile } from 'fs';
import { Day } from '../day';

class Day14 extends Day {
  constructor() {
    super(14);
  }

  solveForPartOne(input: string): string {
    const coords = input
      .split('\n')
      .map((l) => l.split(' -> ').map((p) => p.split(',').map((n) => parseInt(n)))) as [number, number][][];
    const max = Math.max(...coords.flat(2)) + 20;
    const grid = Array.from({ length: max }, () => Array.from({ length: max }).fill('.')) as string[][];
    for (const lineCoords of coords) {
      for (let i = 0; i < lineCoords.length - 1; i++) {
        drawRock(lineCoords[i], lineCoords[i + 1], grid);
      }
    }
    // writeGridToTest(grid);
    let hasFallenIntoTheVoid = false;
    while (!hasFallenIntoTheVoid) {
      hasFallenIntoTheVoid = simulateSand([500, 0], grid);
    }
    return grid.flat().map(x => x === 'o' ? 0+1 : 0).reduce((a,b) => a + b).toString();
  }

  solveForPartTwo(input: string): string {
    const coords = input
      .split('\n')
      .map((l) => l.split(' -> ').map((p) => p.split(',').map((n) => parseInt(n)))) as [number, number][][];
    const maxX = Math.max(...coords.flat(2)) + 1000;
    const maxY = Math.max(...coords.flat().map(p => p[1])) + 3;
    const grid = Array.from({ length: maxY }, () => Array.from({ length: maxX }).fill('.')) as string[][];
    drawRock([0, maxY-1], [maxX, maxY-1], grid);
    for (const lineCoords of coords) {
      for (let i = 0; i < lineCoords.length - 1; i++) {
        drawRock(lineCoords[i], lineCoords[i + 1], grid);
      }
    }
    writeGridToTest(grid);
    let hasFallenIntoTheVoid = false;
    while (!hasFallenIntoTheVoid) {
      hasFallenIntoTheVoid = simulateSand([500, 0], grid);
    }
    return grid.flat().map(x => x === 'o' ? 0+1 : 0).reduce((a,b) => a + b).toString();
  }
}

/**
 * Recursive function simulating sand movement
 * @param sandPoint current sand position
 * @param grid grid representing cave
 * @returns true if sand has fallen into the void or source is blocked, false otherwise
 */
function simulateSand(sandPoint: [number, number], grid: string[][]): boolean {
  const [sandX, sandY] = sandPoint;
  // fallen into the void
  if (pathBlocked(grid[0][500])) return true;
  if (grid.at(sandY + 1)?.at(sandX) === undefined) return true;
  if (
    pathBlocked(grid[sandY + 1][sandX]) &&
    pathBlocked(grid[sandY + 1][sandX - 1]) &&
    pathBlocked(grid[sandY + 1][sandX + 1])
  ) {
    // came to rest
    grid[sandY][sandX] = 'o';
    return false;
  }

  if (!pathBlocked(grid[sandY + 1][sandX])) { 
    return simulateSand([sandX, sandY + 1], grid);
  } else if (!pathBlocked(grid[sandY + 1][sandX - 1]))  {
    return simulateSand([sandX - 1, sandY + 1], grid)
  } else {
    return simulateSand([sandX + 1, sandY], grid);
  } 
}

function pathBlocked(symbol: string) {
  if (symbol === undefined) return false;
  return '#o'.includes(symbol);
}

function drawRock(pointA: [number, number], pointB: [number, number], grid: string[][]) {
  const [minX, maxX, minY, maxY] = [
    Math.min(pointA[0], pointB[0]),
    Math.max(pointA[0], pointB[0]),
    Math.min(pointA[1], pointB[1]),
    Math.max(pointA[1], pointB[1]),
  ];

  for (let y = minY; y <= maxY; y++) {
    for (let x = minX; x <= maxX; x++) {
      grid[y][x] = '#';
    }
  }
}

function writeGridToTest(grid: string[][]) {
  writeFile('./test.txt', grid.map((x) => x.join(' ')).join('\n'), (err) => console.log(err));
}

export default new Day14();
