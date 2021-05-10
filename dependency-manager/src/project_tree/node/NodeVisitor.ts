import Component from '../Component';
import Package from '../Package';
import Visitor from '../Visitor';

class NodeVisitor extends Visitor {
  public visit(pack: NodePackage): void;
  public visit(component: Component): void;
}

export default NodeVisitor;
