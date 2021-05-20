import { Request, Response } from 'express';

import { Context } from '../../types/context';

export default function getUsers(req: Request, res: Response) {
  const { ctx }: { ctx: Context } = req;

  ctx.db.query('SELECT BIN_TO_UUID(id) id, email, password FROM users', (err, rows) => {
    if (err) throw err;

    res.status(200).json({ rows });
  });
}
