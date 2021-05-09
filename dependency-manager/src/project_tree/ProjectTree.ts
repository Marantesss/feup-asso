import Dependable from './Dependable';

abstract class ProjectTree {
  private root: Dependable;

  constructor(root: Dependable) {
    this.root = root;
  }

  public getRoot(): Dependable {
    return this.root;
  }
}

export default ProjectTree;
