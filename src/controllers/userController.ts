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

interface UpdatedUser {
  userId?: string;
  username?: string;
  userEmail?: string;
  userPassword?: string;
}

export const getUsers = async (_req: Request, res: Response) => {
  const results = await mongoDatabase
    .collection<User>('users')
    .find()
    .toArray();
  res.json(results);
};

export const getUserById = async (
  req: Request<
    { id: ObjectId },
    { success: boolean; error: string },
    void,
    void
  >,
  res: Response,
) => {
  try {
    const result = await mongoDatabase
      .collection<OptionalId<User>>('users')
      .findOne({
        _id: new ObjectId(req.params.id),
      });
    if (!result)
      res.status(404).json({ error: 'User not found', success: false });
    else res.status(200).json(result);
  } catch (err) {
    console.error('Error fetching user:', err);
    return res
      .status(500)
      .json({ error: 'Failed to fetch user', success: false });
  }
};

export const createUser = async (
  req: Request<
    void,
    { message?: string; success: boolean; error?: string },
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
    // if(username)
  } catch (err) {
    console.error('Error creating user:', err);
    return res
      .status(500)
      .json({ error: 'Failed to create user', success: false });
  }
  res.status(201).json({ message: 'User created successfully', success: true });
};

export const loginUser = async (
  req: Request<
    void,
    { userId?: string; message?: string; success: boolean; error?: string },
    { username: string; userPassword: string },
    void
  >,
  res: Response,
) => {
  const { username, userPassword } = req.body;
  try {
    const user = await mongoDatabase
      .collection<OptionalId<User>>('users')
      .findOne({
        username: username,
      });
    console.log('user', user);
    console.log('username', username);
    console.log('Password from user', userPassword);
    if (!user) {
      res.status(401).json({ error: 'Wrong username', success: false });
      return;
    }
    const isValid = await bcrypt.compare(userPassword, user.userPassword);
    if (!isValid) {
      res.status(401).json({ error: 'Wrong password', success: false });
      return;
    }
    res.status(200).json({
      userId: user._id,
      message: 'User logged in successfully',
      success: true,
    });
  } catch (err) {
    console.error('Error logging in user:', err);
    return res
      .status(500)
      .json({ error: 'Failed to login user', success: false });
  }
};

export const updateUser = async (
  req: Request<
    { id: ObjectId },
    { success?: boolean; error?: string },
    {
      username?: string;
      userEmail?: string;
      userPassword?: string;
    },
    void
  >,
  res: Response,
) => {
  const { username, userEmail, userPassword } = req.body;
  const updatedUser: UpdatedUser = {};
  console.log('updatedUser', updatedUser);

  if (username) {
    updatedUser.username = username;
  }

  if (userEmail) {
    updatedUser.userEmail = userEmail;
  }

  if (userPassword) {
    const hashedPassword = await bcrypt.hash(userPassword, 10);
    updatedUser.userPassword = hashedPassword;
  }

  try {
    const result = await mongoDatabase
      .collection<OptionalId<User>>('users')
      .updateOne(
        {
          _id: new ObjectId(req.params.id),
        },
        {
          $set: updatedUser,
        },
      );
    if (result.matchedCount === 0)
      res.status(404).json({ error: 'User not found', success: false });
    else res.status(200).json(result);
  } catch (err) {
    console.error('Error updating user:', err);
    return res
      .status(500)
      .json({ error: 'Failed to update user', success: false });
  }
};

export const deleteUser = async (
  req: Request<
    { id: ObjectId },
    { success: boolean; error?: string },
    {
      username: string;
      userEmail: string;
      userPassword: string;
    },
    void
  >,
  res: Response,
) => {
  try {
    const result = await mongoDatabase
      .collection<OptionalId<User>>('users')
      .deleteOne({
        _id: new ObjectId(req.params.id),
      });
    if (result.deletedCount === 0)
      res.status(404).json({ error: 'User not found', success: false });
    else res.status(200).json(result);
  } catch (err) {
    console.error('Error deleting user:', err);
    return res
      .status(500)
      .json({ error: 'Failed to delete user', success: false });
  }
};
