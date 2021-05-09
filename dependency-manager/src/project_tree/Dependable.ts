abstract class Dependable {
  private dependencies: Dependable[]; // FIXME: maybe dependencies isn't the best name, because its meant to be the ones that depend on this one

  private name: string;

  constructor(name: string, dependencies: Dependable[] = []) {
    this.dependencies = dependencies;
    this.name = name;
  }

  public addDependency(dependency: Dependable) {
    this.dependencies.push(dependency);
  }

  public getDependencies(): Dependable[] {
    return this.dependencies;
  }

  public getName(): string {
    return this.name;
  }
}

export default Dependable;
