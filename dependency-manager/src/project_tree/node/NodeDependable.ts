import Dependable from '../Dependable';
import NodeAnnotation from './NodeAnnotation';
import NodeVisitor from './NodeVisitor';

abstract class NodeDependable extends Dependable<NodeDependable> {
  private _isNpm: boolean;

  constructor(name: string, dependencies: NodeDependable[] = [], annotations: NodeAnnotation[] = [], isNpm: boolean = false) {
    super(name, dependencies, annotations);
    this._isNpm = isNpm;
  }

  public set isNpm(value: boolean) {
    this._isNpm = value;
  }

  public get isNpm() {
    return this._isNpm;
  }

  public abstract accept(visitor: NodeVisitor): void;
}

export default NodeDependable;
