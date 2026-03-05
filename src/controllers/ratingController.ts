import type { Request, Response } from 'express';
import mysqlpool from '../connectionMysql.ts';
import type { RowDataPacket } from 'mysql2';
// import type { RowDataPacket, ResultSetHeader } from 'mysql2';

const mysqlDatabase = mysqlpool;

interface Rating extends RowDataPacket {
  // ratingId: number;
  ratingScore: number;
  collectionId: number;
  ratedBy: string;
}
export const getRatings = async (_req: Request, res: Response) => {
  const [results] = await mysqlDatabase.query<Rating[]>(
    'SELECT * FROM ratings WHERE collectionId = 2',
  );
  res.status(200).json(results);
};
