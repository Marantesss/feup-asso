import Visitor from './Visitor';
import Annotation from './Annotation';
import Visitable from './Visitable';

abstract class Dependable implements Visitable {
  protected annotations: Annotation[];

  private name: string;

  constructor(name: string, annotations: Annotation[] = []) {
    this.name = name;
    this.annotations = annotations;
  }

  public getName(): string {
    return this.name;
  }

  public addAnnotation(annotation: Annotation) {
    this.annotations.push(annotation);
  }

  public abstract accept(visitor: Visitor): void

  public abstract addDependency(dependency: Dependable): void;

  public abstract getDependencies(): Dependable[];
}

export default Dependable;
