import { parse, encode, NodeProjectTree } from './project_tree/node/NodeProjectTree';
import NodeTreeDepthFirstIterator from './project_tree/node/NodeTreeDepthFirstIterator';
import NodeAuditVisitor from './project_tree/node/visitors/NodeAuditVisitor';

const madge = require('./adapted_modules/madge');

madge('src/projects/3', { includeNpm: true }).then(async (dependencies: any) => {
  const depObj = dependencies.obj();
  const tree: NodeProjectTree = parse(depObj, 'cimba_sinf');

  const auditVisitor: NodeAuditVisitor = new NodeAuditVisitor();
  const iterator: NodeTreeDepthFirstIterator = tree.getIterator();

  await auditVisitor.build('src/projects/2');
  while (!iterator.isDone) {
    iterator.currentItem().accept(auditVisitor);
    iterator.next();
  }

  console.log(JSON.stringify(encode(tree), null, 2));
});
