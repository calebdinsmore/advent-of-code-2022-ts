import assert from 'assert';
import { Day } from '../day';

function linearDistance(c1: number, c2: number): number {
  return Math.sqrt((c1 - c2) ** 2);
}

class Node {
  distance = Number.POSITIVE_INFINITY;
  neighbors: Node[] = [];
  coords = '';

  get altitude(): number {
    if (this.letter === 'S') return 0;
    if (this.letter === 'E') return 25;

    const alphabetLower = 'abcdefghijklmnopqrstuvwxyz';
    return alphabetLower.indexOf(this.letter);
  }

  constructor(public letter: string) {
    if (letter === 'S') {
      this.distance = 0;
    }
  }
}

class Day12 extends Day {
  constructor() {
    super(12);
  }

  solveForPartOne(input: string): string {
    const nodesRaw = input.split('\n').map((l) => l.split(''));
    const nodesArray = nodesRaw.map((n) => n.map((m) => new Node(m)));
    const unvisitedSet: Set<Node> = new Set(nodesArray.flat());
    const startingNode = this.buildGraph(nodesArray);

    return this.djikstra(startingNode, unvisitedSet).toString();
  }

  solveForPartTwo(input: string): string {
    const nodesRaw = input.split('\n').map((l) => l.split(''));
    const nodesArray = nodesRaw.map((n) => n.map((m) => new Node(m)));
    const startingNodes = nodesArray.flat().filter((n) => n.letter === 'a');
    const S = this.buildGraph(nodesArray);
    S.distance = Number.POSITIVE_INFINITY;
    const paths = startingNodes.map((n) => {
      n.distance = 0;
      const unvisitedSet: Set<Node> = new Set(nodesArray.flat());
      const distance = this.djikstra(n, unvisitedSet);
      nodesArray.flat().forEach((n) => (n.distance = Number.POSITIVE_INFINITY));
      return distance;
    });

    return paths.sort((a, b) => a - b)[0].toString();
  }

  private djikstra(startingNode: Node, unvisitedSet: Set<Node>) {
    let current = startingNode;
    while (unvisitedSet.size > 0) {
      unvisitedSet.delete(current);
      for (const neighbor of current.neighbors) {
        if (unvisitedSet.has(neighbor)) {
          neighbor.distance = Math.min(neighbor.distance, current.distance + 1);
        }
      }

      current = Array.from(unvisitedSet)
        .filter((n) => Number.isFinite(n.distance))
        .sort((a, b) => a.distance - b.distance)[0];

      if (!current) return Number.POSITIVE_INFINITY;

      if (current.letter === 'E') break;
    }
    return current.distance;
  }

  private buildGraph(nodesArray: Node[][]) {
    let startingNode!: Node;
    for (let row = 0; row < nodesArray.length; row++) {
      for (let col = 0; col < nodesArray[0].length; col++) {
        const node = nodesArray[row][col];
        node.coords = `${row}, ${col}`;
        const neighbors: Node[] = [
          nodesArray[row]?.[col - 1],
          nodesArray[row]?.[col + 1],
          nodesArray[row - 1]?.[col],
          nodesArray[row + 1]?.[col],
        ].filter((n) => n !== undefined) as Node[];
        node.neighbors = neighbors.filter((n) => n.altitude - 1 <= node.altitude);

        if (node.letter === 'S') {
          startingNode = node;
        }
      }
    }
    assert(startingNode);
    return startingNode;
  }
}

export default new Day12();
