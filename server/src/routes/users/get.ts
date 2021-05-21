import { Request, Response } from 'express';

import { Context } from '../../types/context';

export default async function getUsers(req: Request, res: Response) {
  try {
    const { ctx }: { ctx: Context } = req;

    const [rows] = await ctx.db.execute(`
    SELECT
      BIN_TO_UUID(id) id, email, password
    FROM
      users
    `);

    res.status(200).json({ rows });
  } catch (err) {
    res.status(500).json({ error: err.toString() });
  }
}
