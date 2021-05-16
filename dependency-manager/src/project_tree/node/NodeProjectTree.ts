import ProjectTree from '../ProjectTree';
import NodeComponent from './NodeComponent';
import NodeDependable from './NodeDependable';
import NodePackage from './NodePackage';

class NodeProjectTree implements ProjectTree {
  private root: NodeDependable;

  constructor(root: NodeDependable) {
    this.root = root;
  }

  public getRoot(): NodeDependable {
    return this.root;
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
    const newComponent = new NodeComponent(path[0], [], [], isNpm);
    children.push(newComponent);
    return newComponent;
  }

  const newPackage: NodePackage = new NodePackage(path[0], [], [], isNpm);
  children.push(newPackage);
  return createPath(newPackage, path.slice(1), isNpm);
}

function parse(tree: any, projectName: string): NodeProjectTree {
  const root = new NodePackage(projectName);
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

export { NodeProjectTree, parse };
