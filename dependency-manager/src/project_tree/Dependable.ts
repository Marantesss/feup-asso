abstract class Dependable {
  private dependencies: Dependable[];

  private name: string;

  constructor(name: string, dependencies: Dependable[] = []) {
    this.dependencies = dependencies;
    this.name = name;
  }

  public getDependencies(): Dependable[] {
    return this.dependencies;
  }

  public getName(): string {
    return this.name;
  }
}

export default Dependable;
