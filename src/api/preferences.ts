import express from 'express';
import { preferencesService } from '../services/preferencesService';

const router = express.Router();

router.get('/:id/preferences', async (req, res) => {
  const data = await preferencesService.get(req.params.id);
  res.json(data);
});

router.post('/:id/preferences', async (req, res) => {
  const { type, channel, enabled } = req.body;
  await preferencesService.upsert(req.params.id, type, channel, enabled);
  res.json({ ok: true });
});

export default router;
