import express from 'express';

import {
  createCollection,
  deleteCollection,
  getCollectionById,
  getCollections,
  updateCollection,
  getCollectionByType,
  getCollectionByTypeUserId,
} from '../controllers/collectionController.ts';

const router = express.Router();

router.get('/collections', getCollections);
router.post('/collection', createCollection);
router.delete('/collection/:id', deleteCollection);
router.get('/collection/:id', getCollectionById);
router.put('/collection/:id', updateCollection);
router.get('/collectionType/:type', getCollectionByType);
router.post('/collectionTypeUser', getCollectionByTypeUserId);
export default router;
