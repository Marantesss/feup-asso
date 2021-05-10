import { parse, NodeProjectTree } from './project_tree/node/NodeProjectTree';

const madge = require('./adapted_modules/madge');

madge('src/projects/2', { includeNpm: true }).then((dependencies: any) => {
  const depObj = dependencies.obj();
  console.log(depObj);
  const tree: NodeProjectTree = parse(depObj, 'cimba_sinf');
});
