import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';

import { Context } from '../../types/context';

interface User {
  id: string;
  email: string;
  password: string;
}

interface UserBody {
  email: string;
  password: string;
}

export default function postUser(req: Request, res: Response) {
  const { body, ctx }: { body: UserBody; ctx: Context } = req;

  const userId: string = uuidv4();

  const user: User = {
    ...body,
    id: userId,
  };

  ctx.db.query(
    `INSERT INTO users (id, email, password) values(UUID_TO_BIN(UUID()), "${user.email}", "${user.password}")`,
    (err, rows) => {
      if (err) throw err;

      res.status(200).json({ rows });
    },
  );
}
