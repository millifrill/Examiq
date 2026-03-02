import type { Request, Response } from 'express';
import mysqlpool from '../connectionMysql.ts';
import type { ResultSetHeader } from 'mysql2';
const db = mysqlpool;

import type { RowDataPacket } from 'mysql2';

interface Quiz extends RowDataPacket {
  quizId: number;
  collectionId: number;
  quizQuestion: string;
  quizCorrectAnswer: string;
  quizAnswer1: string;
  quizAnswer2: string;
  quizAnswer3: string;
  categoryId: number;
}

export async function getQuizzes(_req: Request, res: Response) {
  const [results] = await db.query<Quiz[]>('SELECT * FROM quiz');
  res.json(results);
}

export async function createQuiz(req: Request, res: Response) {
  const {
    collectionId,
    quizQuestion,
    quizCorrectAnswer,
    quizAnswer1,
    quizAnswer2,
    quizAnswer3,
    categoryId,
  } = req.body;

  if (
    !collectionId ||
    !quizQuestion ||
    !quizCorrectAnswer ||
    !quizAnswer1 ||
    !quizAnswer2 ||
    !quizAnswer3 ||
    !categoryId
  ) {
    return res.status(400).json({ error: 'All fields are required' });
  }
  try {
    const [results] = await db.query<ResultSetHeader>(
      'INSERT INTO quiz (quizQuestion, quizCorrectAnswer, quizAnswer1, quizAnswer2, quizAnswer3, categoryId, collectionId) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [
        quizQuestion,
        quizCorrectAnswer,
        quizAnswer1,
        quizAnswer2,
        quizAnswer3,
        categoryId,
        collectionId,
      ],
    );
    if (results.affectedRows === 0) {
      return res.status(404).json({ error: 'Quiz not found' });
    }
  } catch (err) {
    console.error('Error creating quiz:', err);
    return res.status(500).json({ error: 'Failed to create quiz' });
  }
  res.status(201).json({ message: 'Quiz created successfully' });
}

export async function deleteQuiz(req: Request, res: Response) {
  const { id } = req.params;

  try {
    const [results] = await db.query<ResultSetHeader>(
      'DELETE FROM quiz WHERE quizId = ?',
      [id],
    );
    if (results.affectedRows === 0) {
      return res.status(404).json({ error: 'Quiz not found' });
    }
  } catch (err) {
    console.error('Error deleting quiz:', err);
    return res.status(500).json({ error: 'Failed to delete quiz' });
  }
  res.json({ message: 'Quiz deleted successfully' });
}

export async function getQuizById(req: Request, res: Response) {
  const { id } = req.params;

  try {
    const [results] = await db.query<Quiz[]>(
      'SELECT * FROM quiz WHERE quizId = ?',
      [id],
    );
    if (results.length === 0) {
      return res.status(404).json({ error: 'Quiz not found' });
    }
    res.json(results[0]);
  } catch (err) {
    console.error('Error fetching quiz:', err);
    return res.status(500).json({ error: 'Failed to fetch quiz' });
  }
}

export async function updateQuiz(req: Request, res: Response) {
  const { id } = req.params;
  const {
    collectionId,
    quizQuestion,
    quizCorrectAnswer,
    quizAnswer1,
    quizAnswer2,
    quizAnswer3,
    categoryId,
  } = req.body;

  if (
    !quizQuestion ||
    !quizCorrectAnswer ||
    !quizAnswer1 ||
    !quizAnswer2 ||
    !quizAnswer3 ||
    !categoryId ||
    !collectionId
  ) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const [results] = await db.query<ResultSetHeader>(
      'UPDATE quiz SET quizQuestion = ?, quizCorrectAnswer = ?, quizAnswer1 = ?, quizAnswer2 = ?, quizAnswer3 = ?, categoryId = ?, collectionId = ? WHERE quizId = ?',
      [
        quizQuestion,
        quizCorrectAnswer,
        quizAnswer1,
        quizAnswer2,
        quizAnswer3,
        categoryId,
        collectionId,
        id,
      ],
    );

    if (results.affectedRows === 0) {
      return res.status(404).json({ error: 'Quiz not found' });
    }

    res.json({ message: 'Quiz updated successfully' });
  } catch (err) {
    console.error('Error updating quiz:', err);
    return res.status(500).json({ error: 'Failed to update quiz' });
  }
}
