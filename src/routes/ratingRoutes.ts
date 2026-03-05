import express from 'express';

const router = express.Router();
import { getRatings } from '../controllers/ratingController.ts';

router.get('/ratings', getRatings);

export default router;
