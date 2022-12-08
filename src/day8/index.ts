import { Day } from '../day';

class Day8 extends Day {
  constructor() {
    super(8);
  }

  solveForPartOne(input: string): string {
    const grid = input.split('\n').map((l) => l.split(''));
    const visibleTrees: number[][] = Array.from({ length: grid.length }, () =>
      Array.from({ length: grid[0].length }).fill(0)
    ) as number[][];
    for (let row = 1; row < grid.length - 1; row++) {
      let tallestTree = grid[row][0];
      for (let col = 1; col < grid[0].length - 1; col++) {
        const tree = grid[row][col];
        if (tree > tallestTree) {
          visibleTrees[row][col] = 1;
          tallestTree = tree;
        }
      }

      tallestTree = grid[row].at(-1)!;
      for (let col = -2; col > grid[0].length * -1; col--) {
        const tree = grid[row].at(col)!;
        if (tree > tallestTree) {
          visibleTrees[row][grid[0].length + col] = 1;
          tallestTree = tree;
        }
      }
    }

    for (let col = 1; col < grid[0].length - 1; col++) {
      let tallestTree = grid[0][col];
      for (let row = 1; row < grid.length - 1; row++) {
        const tree = grid[row][col];
        if (tree > tallestTree) {
          visibleTrees[row][col] = 1;
          tallestTree = tree;
        }
      }

      tallestTree = grid.at(-1)![col];
      for (let row = -2; row > grid.length * -1; row--) {
        const tree = grid.at(row)![col];
        if (tree > tallestTree) {
          visibleTrees[grid.length + row][col] = 1;
          tallestTree = tree;
        }
      }
    }
    return (grid.length * 4 - 4 + visibleTrees.flatMap((x) => x).reduce((a, b) => a + b)).toString();
  }

  solveForPartTwo(input: string): string {
    const grid = input.split('\n').map((l) => l.split('').map(c => parseInt(c)));
    let maxScore = -1;
    for (let row = 1; row < grid.length - 1; row++) {
      for (let col = 1; col < grid[0].length - 1; col++) {
        const scenicScore = (
          this.computeScenicScore(grid, row, col, -1, grid[row][col], (row, col) => [row + 1, col], true) *
          this.computeScenicScore(grid, row, col, -1, grid[row][col], (row, col) => [row, col + 1], true) *
          this.computeScenicScore(grid, row, col, -1, grid[row][col], (row, col) => [row - 1, col], true) *
          this.computeScenicScore(grid, row, col, -1, grid[row][col], (row, col) => [row, col - 1], true)
        )
        if (scenicScore > maxScore) {
          maxScore = scenicScore;
        }
      }
    }
    return maxScore.toString();
  }

  private computeScenicScore(
    grid: number[][],
    row: number,
    col: number,
    score: number,
    treeHouse: number,
    mutateFunc: (row: number, col: number) => number[],
    firstCall = false,
  ): number {
    const tree = grid.at(row)?.at(col);
    if (tree === undefined || row < 0 || col < 0) return score;
    if (tree >= treeHouse && !firstCall) return score + 1;
    
    const [newRow, newCol] = mutateFunc(row, col);
    return this.computeScenicScore(grid, newRow, newCol, score + 1, treeHouse, mutateFunc);
  }
}

export default new Day8();
