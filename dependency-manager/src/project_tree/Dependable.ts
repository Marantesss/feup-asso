import Visitor from './Visitor';
import Annotation from './Annotation';
import Visitable from './Visitable';

abstract class Dependable implements Visitable {
  private dependencies: Dependable[];

  private annotations: Annotation[];

  private name: string;

  constructor(name: string, dependencies: Dependable[] = [], annotations: Annotation[] = []) {
    this.dependencies = dependencies;
    this.name = name;
    this.annotations = annotations;
  }

  public accept(visitor: Visitor): void {
    visitor.visit(this);
  }

  public addDependency(dependency: Dependable) {
    this.dependencies.push(dependency);
  }

  public addAnnotation(annotation: Annotation) {
    this.annotations.push(annotation);
  }

  public getDependencies(): Dependable[] {
    return this.dependencies;
  }

  public getName(): string {
    return this.name;
  }
}

export default Dependable;
