import express from 'express';
import { getUser, getDashboardStats } from '../controllers/general.js';
import { requireAuth } from '../middleware/requireAuth.js';

const router = express.Router();

router.get('/user/:id', requireAuth, getUser);
router.get('/dashboard', requireAuth, getDashboardStats);

export default router;
