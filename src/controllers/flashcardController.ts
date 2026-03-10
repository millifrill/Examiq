import type { Request, Response } from 'express';
import mysqlpool from '../connectionMysql.ts';
import type { RowDataPacket, ResultSetHeader } from 'mysql2';

const mysqlDatabase = mysqlpool;

interface Flashcard extends RowDataPacket {
  collectionId: number;
  flashcardId?: number;
  flashcardQuestion: string;
  flashcardAnswer: string;
  categoryId: number;
}

export const getFlashcards = async (_req: Request, res: Response) => {
  const [results] = await mysqlDatabase.query<Flashcard[]>(
    'SELECT * FROM flashcard',
  );
  res.status(200).json(results);
};

export const getFlashcardById = async (
  req: Request<
    { id: number },
    { message: string; success: boolean; error: string },
    {
      flashcardQuestion: string;
      flashcardAnswer: string;
      categoryId: number;
      collectionId: number;
    },
    void
  >,
  res: Response,
) => {
  const { id } = req.params;
  const sql = 'SELECT * FROM flashcard WHERE flashcardId = ?';
  try {
    const [result] = await mysqlDatabase.execute<Flashcard[]>(sql, [id]);
    if (result.length === 0) {
      return res.status(404).json({ error: 'Flashcard not found' });
    }
    res.status(200).json(result);
  } catch (err) {
    console.error('Error fetching flashcard:', err);
    return res.status(500).json({ error: 'Failed to fetch flashcard' });
  }
};

export const createFlashcard = async (
  req: Request<
    void,
    { message: string; success: boolean; error: string },
    {
      flashcardQuestion: string;
      flashcardAnswer: string;
      categoryId: number;
      collectionId: number;
    },
    void
  >,
  res: Response,
) => {
  const { flashcardQuestion, flashcardAnswer, categoryId, collectionId } =
    req.body;
  if (!flashcardQuestion || !flashcardAnswer || !categoryId || !collectionId) {
    return res.status(400).json({ error: 'All fields are required' });
  }
  const sql =
    'INSERT INTO flashcard(flashcardQuestion, flashcardAnswer, categoryId, collectionId) VALUES (?,?,?,?)';
  try {
    await mysqlDatabase.execute<Flashcard[]>(sql, [
      flashcardQuestion,
      flashcardAnswer,
      categoryId,
      collectionId,
    ]);
  } catch (err) {
    console.error('Error creating flashcard:', err);
    return res.status(500).json({ error: 'Failed to create flashcard' });
  }
  res.status(201).json({ message: 'Flashcard created successfully' });
};

export const updateFlashcard = async (
  req: Request<
    { id: number },
    void,
    {
      flashcardQuestion: string;
      flashcardAnswer: string;
      categoryId: number;
      collectionId: number;
    },
    void
  >,
  res: Response,
) => {
  const { id } = req.params;
  const { flashcardQuestion, flashcardAnswer, categoryId, collectionId } =
    req.body;
  if (!flashcardQuestion || !flashcardAnswer || !categoryId) {
    return res.status(400).json({ error: 'All fields are required' });
  }
  const sql =
    'UPDATE flashcard SET flashcardQuestion = ?, flashcardAnswer = ?, categoryId = ?, collectionId = ? WHERE flashcardId = ?';
  try {
    const [result] = await mysqlDatabase.execute<ResultSetHeader>(sql, [
      flashcardQuestion,
      flashcardAnswer,
      categoryId,
      collectionId,
      id,
    ]);
    if (result.affectedRows === 0) res.status(404).send('Flashcard not found');
    else res.status(200).send('Flashcard updated successfully');
  } catch (err) {
    console.error('Error updating flashcard:', err);
    return res.status(500).json({ error: 'Failed to update flashcard' });
  }
};

export const deleteFlashcard = async (
  req: Request<
    { id: number },
    void,
    { flashcardQuestion: string; flashcardAnswer: string; categoryId: number },
    void
  >,
  res: Response,
) => {
  const { id } = req.params;
  const sql = 'DELETE FROM flashcard WHERE flashcardId = ?';
  try {
    const [result] = await mysqlDatabase.execute<ResultSetHeader>(sql, [id]);
    if (result.affectedRows === 0) res.status(404).send('Flashcard not found');
    else res.status(200).send('Flashcard deleted successfully');
  } catch (err) {
    console.error('Error deleting flashcard:', err);
    return res.status(500).json({ error: 'Failed to delete flashcard' });
  }
};
