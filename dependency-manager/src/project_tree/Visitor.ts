import Component from './Component';
import Package from './Package';

abstract class Visitor {
  public abstract visit(pack: Package): void;

  public abstract visit(component: Component): void;
}

export default Visitor;
