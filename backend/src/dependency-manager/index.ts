import { parse, encode, NodeProjectTree } from './src/project_tree/node/NodeProjectTree';
import NodeTreeDepthFirstIterator from './src/project_tree/node/NodeTreeDepthFirstIterator';
import NodeAuditVisitor from './src/project_tree/node/visitors/NodeAuditVisitor';

const madge = require('./src/adapted_modules/madge');

async function getDependencies(projectPath: string): Promise<any> {
  const dependencies = await madge(projectPath, { includeNpm: true });
  const depObj = dependencies.obj();
  const name = projectPath.split('/');
  const tree: NodeProjectTree = parse(depObj, name[name.length - 1]);

  const auditVisitor: NodeAuditVisitor = new NodeAuditVisitor();
  const iterator: NodeTreeDepthFirstIterator = tree.getIterator();

  await auditVisitor.build(projectPath);
  while (!iterator.isDone) {
    iterator.currentItem()!.accept(auditVisitor);
    iterator.next();
  }

  return encode(tree);
}

export default getDependencies;
