import express from 'express';
import cors from 'cors';
import covid19Router from './routes/covid19Stats';

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3001;

app.use('/api/covidstats', covid19Router);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
