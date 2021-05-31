import { User } from 'generated/graphql';
import jwt from 'jsonwebtoken';

import { DB } from 'types/db';

export default async function getUser(token: string, db: DB): Promise<User | null> {
  if (!token) {
    return null;
  }

  const { ok, result } = await new Promise((resolve) => {
    jwt.verify(token, 'mySecret', (err: any, verifyResult: any) => {
      if (err) {
        resolve({
          ok: false,
          result: err,
        });
      } else {
        resolve({
          ok: true,
          result: verifyResult,
        });
      }
    });
  });

  if (!ok) {
    return null;
  }

  const tokenId = result;

  const [rows] = await db.execute<User[]>(
    `
  SELECT
    user_token.id, user_token.userId, user.id, user.email
  FROM
    user_tokens user_token
  INNER JOIN  
    users user
  ON
    user.id = user_token.userId
  WHERE
    user_token.id = ?
  `,
    [tokenId],
  );

  const user = {
    id: rows[0].id,
    email: rows[0].email,
  };

  return user;
}
