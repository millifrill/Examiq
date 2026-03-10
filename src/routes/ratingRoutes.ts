import express from 'express';

const router = express.Router();
import { getRatings } from '../controllers/ratingController.ts';
import { createRating } from '../controllers/ratingController.ts';
import { deleteRating } from '../controllers/ratingController.ts';
import { updateRating } from '../controllers/ratingController.ts';

router.get('/ratings', getRatings);
router.post('/rating', createRating);
router.delete('/rating/:id', deleteRating);
router.put('/rating/:id', updateRating);

export default router;
