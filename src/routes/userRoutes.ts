import express from 'express';

const router = express.Router();

import {
  getUsers,
  getUserById,
  createUser,
  loginUser,
  updateUser,
} from '../controllers/userController.ts';

router.get('/users', getUsers);
router.get('/user/:id', getUserById);
router.post('/register', createUser);
router.post('/login', loginUser);
router.patch('/user/:id', updateUser);

export default router;
