import type { Request, Response } from 'express';
import mysqlpool from '../connectionMysql.ts';
import type { RowDataPacket, ResultSetHeader } from 'mysql2';

const mysqlDatabase = mysqlpool;

interface Rating extends RowDataPacket {
  ratingScore: number;
  collectionId: number;
  ratedBy: string;
}

export const getRatings = async (_req: Request, res: Response) => {
  const [results] = await mysqlDatabase.query<Rating[]>(
    'SELECT * FROM ratings',
  );
  res.status(200).json(results);
};

export const createRating = async (
  req: Request<{ ratingScore: number; collectionId: number; ratedBy: string }>,
  res: Response,
) => {
  const { ratingScore, collectionId, ratedBy } = req.body;
  if (!ratingScore || !collectionId || !ratedBy) {
    return res.status(400).json({ error: 'Write in all fields please' });
  }
  const sql =
    'INSERT INTO ratings(ratingScore, collectionId, ratedBy) VALUES (?,?,?)';
  try {
    await mysqlDatabase.execute<Rating[]>(sql, [
      ratingScore,
      collectionId,
      ratedBy,
    ]);
  } catch (err) {
    console.error('Error creating rating:', err);
    return res.status(500).json({ error: 'Failed to create rating' });
  }
  res.status(201).send('Your rating was successfully added');
};

export const deleteRating = async (
  req: Request<{ id: number }>,
  res: Response,
) => {
  const { id } = req.params;
  const sql = 'DELETE FROM ratings WHERE ratingId = ?';
  try {
    const [result] = await mysqlDatabase.execute<ResultSetHeader>(sql, [id]);
    if (result.affectedRows === 0) {
      res.status(404).send('Rating not found');
    } else res.status(200).send('Rating deleted successfully');
  } catch (err) {
    console.error('Error deleting rating', err);
    return res.status(500).json({ error: 'Failed to delete rating' });
  }
};

export const updateRating = async (
  req: Request<
    { id: number },
    void,
    {
      ratingScore: number;
      ratedBy: string;
      collectionId: number;
    },
    void
  >,
  res: Response,
) => {
  const { id } = req.params;
  const { ratingScore, ratedBy, collectionId } = req.body;
  if (!ratingScore || !ratedBy || !collectionId) {
    return res.status(400).json({ error: 'All fields are required' });
  }
  const sql =
    'UPDATE ratings SET ratingScore = ?, ratedBy = ?, collectionId = ? WHERE ratingId = ?';
  try {
    const [result] = await mysqlDatabase.execute<ResultSetHeader>(sql, [
      ratingScore,
      ratedBy,
      collectionId,
      id,
    ]);
    if (result.affectedRows === 0) res.status(404).send('Rating not found');
    else res.status(200).send('Rating updated successfully');
  } catch (err) {
    console.error('Error updating rating:', err);
    return res.status(500).json({ error: 'Faild to update rating' });
  }
};
