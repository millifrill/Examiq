import type { Request, Response } from 'express';
import mysqlpool from '../connectionMysql.ts';
import type { RowDataPacket, ResultSetHeader } from 'mysql2';

const mysqlDatabase = mysqlpool;

interface Flashcard extends RowDataPacket {
  collectionId: number;
  flashcardId?: number;
  flashcardQuestion: string;
  flashcardAnswer: string;
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
    { success?: boolean; error?: string },
    void,
    void
  >,
  res: Response,
) => {
  const { id } = req.params;
  const sql = 'SELECT * FROM flashcard WHERE flashcardId = ?';
  try {
    const [result] = await mysqlDatabase.execute<Flashcard[]>(sql, [id]);
    if (result.length === 0) {
      return res
        .status(404)
        .json({ error: 'Flashcard not found', success: false });
    }
    res.status(200).json(result);
  } catch (err) {
    console.error('Error fetching flashcard:', err);
    return res
      .status(500)
      .json({ error: 'Failed to fetch flashcard', success: false });
  }
};

export async function getFlashcardByCollection(
  req: Request<
    { collectionId: number },
    { success?: boolean; error?: string },
    void,
    void
  >,
  res: Response,
) {
  const { collectionId } = req.params;

  try {
    const [results] = await mysqlDatabase.query<Flashcard[]>(
      'SELECT * FROM flashcard WHERE collectionId = ?',
      [collectionId],
    );
    if (results.length === 0) {
      return res.status(404).json({
        error: 'No flashcard with this collection found',
        success: false,
      });
    }
    res.status(200).json(results);
  } catch (err) {
    console.error('Error fetching flashcards:', err);
    return res
      .status(500)
      .json({ error: 'Failed to fetch collection', success: false });
  }
}

export const createFlashcard = async (
  req: Request<
    void,
    { message?: string; success: boolean; error?: string },
    {
      flashcardQuestion: string;
      flashcardAnswer: string;
      collectionId: number;
    },
    void
  >,
  res: Response,
) => {
  const { flashcardQuestion, flashcardAnswer, collectionId } = req.body;
  if (!flashcardQuestion || !flashcardAnswer || !collectionId) {
    return res
      .status(400)
      .json({ error: 'All fields are required', success: false });
  }
  const sql =
    'INSERT INTO flashcard(flashcardQuestion, flashcardAnswer, collectionId) VALUES (?,?,?)';
  try {
    await mysqlDatabase.execute<Flashcard[]>(sql, [
      flashcardQuestion,
      flashcardAnswer,
      collectionId,
    ]);
  } catch (err) {
    console.error('Error creating flashcard:', err);
    return res
      .status(500)
      .json({ error: 'Failed to create flashcard', success: false });
  }
  res
    .status(201)
    .json({ message: 'Flashcard created successfully', success: true });
};

export const updateFlashcard = async (
  req: Request<
    { id: number },
    { message?: string; success: boolean; error?: string },
    {
      flashcardQuestion: string;
      flashcardAnswer: string;
      collectionId: number;
    },
    void
  >,
  res: Response,
) => {
  const { id } = req.params;
  const { flashcardQuestion, flashcardAnswer, collectionId } = req.body;
  if (!flashcardQuestion || !flashcardAnswer) {
    return res
      .status(400)
      .json({ error: 'All fields are required', success: false });
  }
  const sql =
    'UPDATE flashcard SET flashcardQuestion = ?, flashcardAnswer = ?, collectionId = ? WHERE flashcardId = ?';
  try {
    const [result] = await mysqlDatabase.execute<ResultSetHeader>(sql, [
      flashcardQuestion,
      flashcardAnswer,
      collectionId,
      id,
    ]);
    if (result.affectedRows === 0)
      res.status(404).json({ error: 'Flashcard not found', success: false });
    else
      res
        .status(200)
        .json({ message: 'Flashcard updated successfully', success: true });
  } catch (err) {
    console.error('Error updating flashcard:', err);
    return res
      .status(500)
      .json({ error: 'Failed to update flashcard', success: false });
  }
};

export const deleteFlashcard = async (
  req: Request<
    { id: number },
    { message?: string; success: boolean; error?: string },
    { flashcardQuestion: string; flashcardAnswer: string },
    void
  >,
  res: Response,
) => {
  const { id } = req.params;
  const sql = 'DELETE FROM flashcard WHERE flashcardId = ?';
  try {
    const [result] = await mysqlDatabase.execute<ResultSetHeader>(sql, [id]);
    if (result.affectedRows === 0)
      res.status(404).json({ error: 'Flashcard not found', success: false });
    else
      res
        .status(200)
        .json({ message: 'Flashcard deleted successfully', success: true });
  } catch (err) {
    console.error('Error deleting flashcard:', err);
    return res
      .status(500)
      .json({ error: 'Failed to delete flashcard', success: false });
  }
};
