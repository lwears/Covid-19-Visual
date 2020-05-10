import express from 'express';
import covid19Service from '../services/covid19Service';

const router = express.Router();

router.get('/', async (_req, res) => {
  try {
    const results = await covid19Service.getAllData();
    res.json(results);
  } catch (error) {
    res.status(500);
    res.json({ error: error.message });
  }
});

export default router;
