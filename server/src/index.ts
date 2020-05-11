import express from 'express';
import cors from 'cors';
import covid19Router from './routes/covid19Stats';
import indexRouter from './routes/index';

const app = express();
app.use(cors());
app.use(express.json());

function normalizePort(val) {
  const port = parseInt(val, 10);
  if (Number.isNaN(port)) return val;
  if (port >= 0) return port;
  return false;
}

const PORT = normalizePort(process.env.PORT || '3001');

app.use('/api/covidstats', covid19Router);
app.use('/', indexRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
