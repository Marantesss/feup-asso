import cors from 'cors';
import express from 'express';
import getDependencies from './dependency-manager';

const app = express();
const port = 3000; // default port to listen

// middlewares
const options: cors.CorsOptions = {
  origin: '*',
};
app.use(cors(options));

app.get('/', async (req, res) => {
  const path = 'src/dependency-manager/src/projects/2';
  res.json(await getDependencies(path));
});

// start the Express server
app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});
