import express from 'express';
import { currentUser } from '@littlebench/common';
import { requireAuth } from '@littlebench/common';

const router = express.Router();

router.get('/api/users/currentuser', currentUser, requireAuth, (req, res) => {
  return res.send({ currentUser: req.currentUser || null });
});

export { router as currentUserRouter };
