import type { Request, Response } from 'express';
import { ObjectId, type OptionalId } from 'mongodb';
import { mongoDatabase } from '../connectionMongoDB.ts';
import bcrypt from 'bcrypt';

interface User {
  userId?: string;
  username: string;
  userEmail: string;
  userPassword: string;
}

export const getUsers = async (_req: Request, res: Response) => {
  const results = await mongoDatabase
    .collection<User>('users')
    .find()
    .toArray();
  res.json(results);
};

export const getUserById = async (
  req: Request<{ id: ObjectId }, void, void, void>,
  res: Response,
) => {
  try {
    const result = await mongoDatabase
      .collection<OptionalId<User>>('users')
      .findOne({
        _id: new ObjectId(req.params.id),
      });
    if (!result) res.status(404).send('User not found');
    else res.status(200).send(result);
  } catch (err) {
    console.error('Error fetching user:', err);
    return res.status(500).json({ error: 'Failed to fetch user' });
  }
};

export const createUser = async (
  req: Request<
    void,
    void,
    { username: string; userEmail: string; userPassword: string },
    void
  >,
  res: Response,
) => {
  const { username, userEmail, userPassword } = req.body;
  const hashedPassword = await bcrypt.hash(userPassword, 10);
  try {
    await mongoDatabase.collection<OptionalId<User>>('users').insertOne({
      username: username,
      userEmail: userEmail,
      userPassword: hashedPassword,
    });
    console.log('Password from user', userPassword);
    console.log('Hashed password', hashedPassword);
  } catch (err) {
    console.error('Error creating user:', err);
    return res.status(500).json({ error: 'Failed to create user' });
  }
  res.status(201).send('User created successfully');
};

export const updateUser = async (
  req: Request<
    { id: ObjectId },
    void,
    {
      username: string;
      userEmail: string;
      userPassword: string;
    },
    void
  >,
  res: Response,
) => {
  const { username, userEmail, userPassword } = req.body;
  try {
    const result = await mongoDatabase
      .collection<OptionalId<User>>('users')
      .updateOne(
        {
          _id: new ObjectId(req.params.id),
        },
        {
          $set: {
            username: username,
            userEmail: userEmail,
            userPassword: userPassword,
          },
        },
      );
    if (result.matchedCount === 0) res.status(404).send('User not found');
    else res.status(200).send(result);
  } catch (err) {
    console.error('Error updating user:', err);
    return res.status(500).json({ error: 'Failed to update user' });
  }
};
