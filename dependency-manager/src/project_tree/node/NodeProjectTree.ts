import ProjectTree from '../ProjectTree';
import NodeComponent from './NodeComponent';
import NodeDependable from './NodeDependable';
import NodePackage from './NodePackage';

class NodeProjectTree extends ProjectTree {
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

function createPath(root: NodeDependable, path: string[]): NodeDependable {
  if (path.length === 0) {
    return root;
  }

  const children: NodeDependable[] = root.getDependencies();

  for (let i = 0; i < children.length; i += 1) {
    if (children[i].getName() === path[0]) {
      return createPath(children[i], path.slice(1));
    }
  }

  if (isFile(path[0])) {
    const newComponent = new NodeComponent(path[0]);
    children.push(newComponent);
    return newComponent;
  }

  const newPackage: NodePackage = new NodePackage(path[0]);
  children.push(newPackage);
  return createPath(newPackage, path.slice(1));
}

function parse(tree: any, projectName: string): ProjectTree {
  const root = new NodePackage(projectName);
  const fileMapping: { [path: string]: NodeComponent } = {};

  // eslint-disable-next-line no-restricted-syntax
  for (const key of Object.keys(tree)) {
    const path = splitPath(key);
    const newComponent: NodeComponent = createPath(root, path);
    fileMapping[key] = newComponent;
  }

  // eslint-disable-next-line no-restricted-syntax
  for (const key of Object.keys(tree)) {
    tree[key].forEach(
      (dep: string) => {
        if (isNodeModule(dep)) {
          const newComponent: NodeComponent = createPath(root, splitPath(dep.substr(dep.indexOf('node_modules'))));
          fileMapping[key] = newComponent;
        }

        fileMapping[key].addDependency(fileMapping[dep]);
      },
    );
  }

  return new NodeProjectTree(root);
}

export { NodeProjectTree, parse };