import express from 'express';
import { evaluate } from '../domain/evaluate';

const router = express.Router();

router.post('/evaluate', async (req, res) => {
  const result = await evaluate(req.body);
  console.log(result);
  res.json(result);
});

export default router;
