import express from 'express';
import path from 'path';

const router = express.Router();

/* GET React Frontend. */
router.get('/', (_req, res) => {
  res.sendFile(
    `${path.resolve('../')}/covid-19-web-app/client/build/index.html`
  );
});

export default router;
