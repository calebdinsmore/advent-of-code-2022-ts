import { Day } from '../day';

class Day6 extends Day {
  constructor() {
    super(6);
  }

  solveForPartOne(input: string): string {
    return this.getMarker(input, 4).toString();
  }

  solveForPartTwo(input: string): string {
    return this.getMarker(input, 14).toString();
  }

  private getMarker(input: string, markerSize: number): number {
    for (let i = 0; i < input.length; i++) {
      const packet = new Set(input.slice(i, i + markerSize));
      if (packet.size === markerSize) {
        return i + markerSize;
      }
    }
    return -1;
  }
}

export default new Day6();
