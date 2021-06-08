import { User } from 'generated/graphql';
import jwt from 'jsonwebtoken';
import { Knex } from 'knex';

export default async function getUser(token: string, kdb: Knex): Promise<User | undefined> {
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

  const user = await kdb('user_tokens')
    .select('user_tokens.id', 'users.email', 'users.id')
    .where({ 'user_tokens.id': tokenId, revoked: false })
    .join('users', 'user_tokens.user_id', '=', 'users.id')
    .first();

  return user;
}
