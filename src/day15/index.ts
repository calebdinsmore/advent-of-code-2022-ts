import { writeFile } from 'fs';
import { Day } from '../day';

const LINE_RE =
  /Sensor at x=(?<sensorX>-?\d+), y=(?<sensorY>-?\d+): closest beacon is at x=(?<beaconX>-?\d+), y=(?<beaconY>-?\d+)/gm;

type Data = {
  sensorPoint: [number, number];
  beaconPoint: [number, number];
  distance?: number;
};

function manhattanDistance(pointA: [number, number], pointB: [number, number]): number {
  return Math.abs(pointA[0] - pointB[0]) + Math.abs(pointA[1] - pointB[1]);
}

class Grid {
  coords: { [y: string]: { [x: string]: string } } = {};

  set(point: [number, number], value: string) {
    const [x, y] = point;
    if (!this.coords[y]) this.coords[y] = {};
    this.coords[y][x] = value;
  }

  fillSensorCoverage(sensorPoint: [number, number], beaconPoint: [number, number], distance: number) {
    this.set(sensorPoint, 'S');
    this.set(beaconPoint, 'B');
    const y = 2_000_000;
    if (y >= sensorPoint[1] - distance && y <= sensorPoint[1] + distance) {
      for (let x = sensorPoint[0] - distance; x < sensorPoint[0] + distance; x++) {
        if (
          (x === beaconPoint[0] && y === beaconPoint[1]) ||
          (x === sensorPoint[0] && y === sensorPoint[1])
        ) {
          continue;
        }
        if (manhattanDistance(sensorPoint, [x, y]) <= distance) {
          this.set([x, y], '#');
        }
      }
    }
  }
}

class Day15 extends Day {
  constructor() {
    super(15);
  }

  solveForPartOne(input: string): string {
    const matches = input.matchAll(LINE_RE);
    const dataObjects: Data[] = [];
    for (const match of matches) {
      const { sensorX, sensorY, beaconX, beaconY } = match.groups!;
      dataObjects.push({
        sensorPoint: [parseInt(sensorX), parseInt(sensorY)],
        beaconPoint: [parseInt(beaconX), parseInt(beaconY)],
      });
    }
    const grid = new Grid();

    for (const data of dataObjects) {
      const { sensorPoint, beaconPoint } = data;
      const distance = manhattanDistance(sensorPoint, beaconPoint);
      grid.fillSensorCoverage(sensorPoint, beaconPoint, distance);
    }

    return Object.values(grid.coords[2000000])
      .filter((x) => x === '#')
      .length.toString();
  }

  solveForPartTwo(input: string): string {
    const matches = input.matchAll(LINE_RE);
    const dataObjects: Data[] = [];
    for (const match of matches) {
      const { sensorX, sensorY, beaconX, beaconY } = match.groups!;
      const point: Data = {
        sensorPoint: [parseInt(sensorX), parseInt(sensorY)],
        beaconPoint: [parseInt(beaconX), parseInt(beaconY)],
      };
      point.distance = manhattanDistance(point.sensorPoint, point.beaconPoint);
      dataObjects.push(point);
    }
    const maxPossible = 4_000_000;
    for (let y = 0; y <= maxPossible; y++) {
      for (let x = 0; x <= maxPossible; ) {
        let foundIt = true;
        for (const { sensorPoint, distance } of dataObjects) {
          if (manhattanDistance(sensorPoint, [x, y]) <= distance!) {
            foundIt = false;
            const skip = distance! - manhattanDistance(sensorPoint, [x, y]) + 1;
            x += skip;
          }
        }
        if (foundIt) {
          return (x * 4_000_000 + y).toString();
        }
      }
    }
    return 'No dice';
  }
}

export default new Day15();
