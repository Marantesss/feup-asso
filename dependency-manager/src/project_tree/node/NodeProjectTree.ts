import ProjectTree from '../ProjectTree';
import NodeComponent from './NodeComponent';
import NodeDependable from './NodeDependable';
import NodePackage from './NodePackage';
import NodeTreeDepthFirstIterator from './NodeTreeDepthFirstIterator';

let id = 0;

class NodeProjectTree implements ProjectTree {
  private root: NodeDependable;

  constructor(root: NodeDependable) {
    this.root = root;
  }

  public getRoot(): NodeDependable {
    return this.root;
  }

  public getIterator(): NodeTreeDepthFirstIterator {
    return new NodeTreeDepthFirstIterator(this.getRoot());
  }
}

function isFile(candidate: string): boolean {
  return candidate.endsWith('.js');
}

function splitPath(path: string): string[] {
  return path.split('/');
}

function isNodeModule(path: string): boolean {
  return path.indexOf('node_modules') !== -1;
}

function createPath(root: NodeDependable, path: string[], isNpm: boolean = false): NodeDependable {
  if (path.length === 0) {
    return root;
  }

  const children: NodeDependable[] = root.getDependencies();

  for (const child of children) {
    if (child.getName() === path[0]) {
      return createPath(child, path.slice(1), isNpm);
    }
  }

  if (isFile(path[0])) {
    id += 1;
    const newComponent = new NodeComponent(path[0], id.toString(), [], [], isNpm);
    children.push(newComponent);
    return newComponent;
  }

  id += 1;
  const newPackage: NodePackage = new NodePackage(path[0], id.toString(), [], [], isNpm);
  children.push(newPackage);
  return createPath(newPackage, path.slice(1), isNpm);
}

function parse(tree: any, projectName: string): NodeProjectTree {
  id += 1;
  const root = new NodePackage(projectName, id.toString());
  const fileMapping: { [path: string]: NodeDependable } = {};

  for (const key of Object.keys(tree)) {
    const path = splitPath(key);
    const newComponent: NodeDependable = createPath(root, path);
    fileMapping[key] = newComponent;
  }

  for (const key of Object.keys(tree)) {
    tree[key].forEach(
      (dep: string) => {
        if (isNodeModule(dep)) {
          const newComponent: NodeDependable = createPath(root, splitPath(dep.substr(dep.indexOf('node_modules'))), true);
          fileMapping[dep] = newComponent;
        }
        fileMapping[key].addDependency(fileMapping[dep]);
      },
    );
  }

  return new NodeProjectTree(root);
}

function encode(tree: NodeProjectTree): {nodes: {id:string, label:string}[], edges: {from:string, to:string}[]} {
  const root = tree.getRoot();

  const queue = [root];

  const nodes: {id:string, label:string}[] = [];
  const edges: {from:string, to:string}[] = [];

  const visited: Set<string> = new Set<string>();

  while (queue.length !== 0) {
    const node = queue.shift();

    if (node !== undefined && !visited.has(node.getId())) {
      nodes.push({ id: node.getId(), label: node.getName() });

      for (const dependency of node.getDependencies()) {
        edges.push({ from: node.getId(), to: dependency.getId() });

        queue.push(dependency);
      }

      visited.add(node.getId());
    }
  }

  return { nodes, edges };
}

export { NodeProjectTree, parse, encode };
