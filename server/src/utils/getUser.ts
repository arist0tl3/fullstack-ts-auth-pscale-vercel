import { User } from 'generated/graphql';
import jwt from 'jsonwebtoken';
import { Knex } from 'knex';

export default async function getUser(token: string, knex: Knex): Promise<User | undefined> {
  if (!token) {
    return undefined;
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
    return undefined;
  }

  const tokenId = result;

  const user = await knex('userToken')
    .select('userToken.id', 'user.email', 'user.id')
    .where({ 'userToken.id': tokenId, revoked: false })
    .join('user', 'userToken.userId', '=', 'user.id')
    .first();

  return user;
}
