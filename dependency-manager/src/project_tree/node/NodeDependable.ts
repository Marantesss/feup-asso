import Dependable from '../Dependable';

// class NodeDependable extends Dependable {
//   private _isNpm: boolean;

//   constructor(name: string, dependencies: NodeDependable[] = [], annotations: NodeAnnotation[] = [], isNpm: boolean = false) {
//     super(name, dependencies, annotations);
//     this._isNpm = isNpm;
//   }

//   public set isNpm(value: boolean) {
//     this._isNpm = value;
//   }

//   public get isNpm() {
//     return this._isNpm;
//   }
// }

class NodeDependable {
  private _isNpm: boolean;

  private dependable: Dependable;

  constructor(dependable: Dependable, isNpm: boolean = false) {
    this._isNpm = isNpm;
    this.dependable = dependable;
  }

  public set isNpm(value: boolean) {
    this._isNpm = value;
  }

  public get isNpm() {
    return this._isNpm;
  }
}

export default NodeDependable;
