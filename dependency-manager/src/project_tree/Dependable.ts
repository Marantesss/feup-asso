import Visitor from './Visitor';
import Annotation from './Annotation';
import Visitable from './Visitable';

abstract class Dependable<T extends any> implements Visitable {
  protected dependencies: T[];

  protected annotations: Annotation[];

  private name: string;

  constructor(name: string, dependencies: T[] = [], annotations: Annotation[] = []) {
    this.dependencies = dependencies;
    this.name = name;
    this.annotations = annotations;
  }

  public abstract accept(visitor: Visitor): void

  public addDependency(dependency: T) {
    this.dependencies.push(dependency);
  }

  public addAnnotation(annotation: Annotation) {
    this.annotations.push(annotation);
  }

  public getDependencies(): T[] {
    return this.dependencies;
  }

  public getName(): string {
    return this.name;
  }
}

export default Dependable;
