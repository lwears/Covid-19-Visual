import express from 'express';
import cors from 'cors';
import path from 'path';
import covid19Router from './routes/covid19Stats';
import indexRouter from './routes/index';

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '/../client/build')));
app.use('/', indexRouter);
app.use('/api/covidstats', covid19Router);

function normalizePort(val: string): number | string | boolean {
  const port = parseInt(val, 10);
  if (Number.isNaN(port)) return val;
  if (port >= 0) return port;
  return false;
}

const PORT = normalizePort(process.env.PORT || '3000');

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
