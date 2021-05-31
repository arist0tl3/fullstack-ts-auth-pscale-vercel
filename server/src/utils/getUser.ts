import { User } from 'generated/graphql';
import jwt from 'jsonwebtoken';

import { db as Idb } from 'types/db';

export default async function getUser(token: string, db: Idb): Promise<User | null> {
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

  const { tokenId } = result;

  const [rows] = await db.execute(
    `
  SELECT
    userToken.id, userToken.userId, user.id, user.token
  FROM
    user_tokens user_token
  INNER JOIN  
    users user
  ON
    user.id = userToken.userId
  WHERE
    userToken.id = ? AND userToken.revoked != TRUE
  `,
    [tokenId],
  );

  console.log('r', rows);

  return rows;
}
