import type { Request, Response } from 'express';
import mysqlpool from '../connectionMysql.ts';
import type { ResultSetHeader } from 'mysql2';
import type { RowDataPacket } from 'mysql2';

const db = mysqlpool;

interface Collection extends RowDataPacket {
  collectionId?: number;
  collectionName: string;
  collectionType: string;
  collectionCategory: number;
  sharedCollection: boolean;
  createdBy: string;
  categoryId: number;
}

export async function createCollection(req: Request, res: Response) {
  const {
    collectionName,
    collectionType,
    sharedCollection,
    createdBy,
    categoryId,
  } = req.body;
  let affectedRows: number;
  if (
    !collectionName ||
    !collectionType ||
    sharedCollection === undefined ||
    !createdBy ||
    !categoryId
  ) {
    return res.status(400).json({
      error:
        'collection name, collection type, shared status, creator, and category ID required',
    });
  }
  try {
    const [results] = await db.query<ResultSetHeader>(
      'INSERT INTO collections (collectionName, collectionType, sharedCollection, createdBy, categoryId) VALUES (?,?,?,?,?)',
      [collectionName, collectionType, sharedCollection, createdBy, categoryId],
    );

    affectedRows = results.affectedRows;
  } catch (err) {
    return res.status(500).json({ message: 'something went wrong', err });
  }

  return res.status(201).json({
    message: 'collection was created successfully',
    affectedRows,
  });
}

export async function getCollections(_req: Request, res: Response) {
  try {
    const [results] = await db.query<Collection[]>('SELECT * FROM collections');
    if (results.length > 0) {
      return res.status(200).json(results);
    }
  } catch (err) {
    console.error('There was an error fetching the collections :( ', err);
  }
}

export async function deleteCollection(req: Request, res: Response) {
  const { id } = req.params;
  let rows;
  try {
    const [results] = await db.query<ResultSetHeader>(
      'DELETE FROM collections WHERE collectionId = ?',
      [id],
    );
    if (results.affectedRows === 0) {
      res
        .status(404)
        .json({ message: 'A collection with that ID does not exist' });
    }
    rows = results.affectedRows;
  } catch (err) {
    console.error('error deleteing collection', err);
  }

  return res.status(200).json({
    message: `deleteCollection was run affecting ${rows} row(s)`,
  });
}

export async function getCollectionById(req: Request, res: Response) {
  const { id } = req.params;
  let returnData;
  try {
    const [results] = await db.query<Collection[]>(
      'SELECT * FROM collections WHERE collectionId = ?',
      [id],
    );
    returnData = results;
  } catch (err) {
    console.error('There was an error getting the collection', err);
  }
  res.status(201).json({ message: 'getCollectionById was run', returnData });
}

export async function updateCollection(req: Request, res: Response) {
  const { id } = req.params;
  const {
    collectionName,
    collectionType,
    sharedCollection,
    createdBy,
    categoryId,
  } = req.body;
  if (
    !collectionName ||
    !collectionType ||
    sharedCollection === undefined ||
    !createdBy ||
    !categoryId
  ) {
    return res.status(400).json({
      error:
        'collection name, type, shared status, creator, and category ID required',
    });
  }
  try {
    const [results] = await db.query<ResultSetHeader>(
      'UPDATE collections SET collectionName = ?, collectionType = ?, sharedCollection = ?, createdBy = ?, categoryId = ? WHERE collectionId = ?',
      [
        collectionName,
        collectionType,
        sharedCollection,
        createdBy,
        categoryId,
        id,
      ],
    );
    if (results.affectedRows === 0) {
      res
        .status(404)
        .json({ message: `A collection with id ${id} does not exist` });
    }
  } catch (err) {
    console.error('Error when using put ', err);
  }

  return res.json({ message: 'updateCollection was run' });
}

export async function getCollectionByType(req: Request, res: Response) {
  const { type } = req.params;
  let returnData;
  try {
    const [results] = await db.query<Collection[]>(
      'SELECT * FROM collections WHERE collectionType = ?',
      [type],
    );
    returnData = results;
  } catch (err) {
    console.error('There was an error getting the collection', err);
  }
  res
    .status(201)
    .json({ message: 'getCollectionByType was run', returnData: returnData });
}
