import { Day } from '../day';

/**
 * @property {object} children - POJO mapping file/directory names to their respective nodes
 */
class Node {
  isDirectory: boolean;
  size: number;
  children: { [key: string]: Node } = {};
  parent?: Node;

  constructor(isDirectory: boolean, size: number, parent?: Node) {
    this.isDirectory = isDirectory;
    this.size = size;
    this.parent = parent;
  }

  print(depth = 0): void {
    for (const childName in this.children) {
      if (this.children[childName].isDirectory) {
        console.log(`${' '.repeat(depth * 2)}dir ${childName} - ${this.children[childName].size}`)
        this.children[childName].print(depth + 1);
      } else {
        console.log(`${' '.repeat(depth * 2)}${this.children[childName].size} ${childName}`);
      }
    }
  }
}

class Day7 extends Day {
  constructor() {
    super(7);
  }

  solveForPartOne(input: string): string {
    const lines = input.split('\n').slice(1);
    const treeRoot = this.buildTree(lines);
    this.computeDirectorySize(treeRoot);
    const directoriesMax100K = this.getSubdirectoriesMax100K(treeRoot);
    return directoriesMax100K.map(n => n.size).reduce((a, b) => a + b).toString();
  }

  solveForPartTwo(input: string): string {
    const lines = input.split('\n').slice(1);
    const treeRoot = this.buildTree(lines);
    this.computeDirectorySize(treeRoot);
    const subDirsBigEnough = this.subDirectoriesBigEnoughToFreeSpace(treeRoot, 70_000_000 - treeRoot.size);
    subDirsBigEnough.sort((a, b) => a.size - b.size);
    return subDirsBigEnough[0].size.toString();
  }

  private buildTree(lines: string[]): Node {
    const root = new Node(true, 0);
    let current = root;
    for (const line of lines) {
      if (line.startsWith('$')) {
        const [_, command, arg] = line.split(' ');
        if (command === 'cd') {
          if (arg === '..') {
            current = current.parent!;
          } else {
            current = current.children[arg];
          }
        }
      } else {
        // is showing the output of ls
        if (line.startsWith('dir')) {
          const [_, dirName] = line.split(' ');
          current.children[dirName] = new Node(true, 0, current);
        } else {
          const [size, fileName] = line.split(' ');
          current.children[fileName] = new Node(false, parseInt(size), current);
        }
      }
    }
    return root;
  }

  private computeDirectorySize(node: Node): number {
    const fileSum = Object.values(node.children)
      .filter((n) => !n.isDirectory)
      .map((n) => n.size)
      .reduce((a, b) => a + b, 0);
    const directorySum = Object.values(node.children)
      .filter((n) => n.isDirectory)
      .map((n) => this.computeDirectorySize(n))
      .reduce((a, b) => a + b, 0);
    node.size = fileSum + directorySum;
    return fileSum + directorySum;
  }

  private getSubdirectoriesMax100K(node: Node): Node[] {
    const childrenMax100K = Object.values(node.children).filter(n => n.isDirectory).flatMap(n => this.getSubdirectoriesMax100K(n));
    if (node.size <= 100_000) {
      childrenMax100K.push(node);
    }
    return childrenMax100K;
  }

  private subDirectoriesBigEnoughToFreeSpace(node: Node, unusedSpace: number): Node[] {
    const subDirsBigEnough = Object.values(node.children).filter(n => n.isDirectory).flatMap(n => this.subDirectoriesBigEnoughToFreeSpace(n, unusedSpace));
    if (unusedSpace + node.size >= 30_000_000) {
      subDirsBigEnough.push(node);
    }
    return subDirsBigEnough;
  }
}

export default new Day7();
