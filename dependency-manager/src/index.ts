const madge = require('./adapted_modules/madge');

madge('src/projects/2', { includeNpm: true }).then((res: any) => {
  console.log(res.obj());
});
