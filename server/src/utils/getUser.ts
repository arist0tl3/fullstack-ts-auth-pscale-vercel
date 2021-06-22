import { User } from 'generated/graphql';
import jwt from 'jsonwebtoken';
import UserTokenModel from 'models/UserToken';

const { JWT_SECRET = 'jwtSecret' } = process.env;

export default async function getUser(token: string): Promise<User | undefined> {
  if (!token) {
    return undefined;
  }

  const { ok, result } = await new Promise((resolve) => {
    jwt.verify(token, JWT_SECRET, (err: any, verifyResult: any) => {
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

  const { user } = await UserTokenModel.query().findById(tokenId).withGraphFetched('user');

  return user;
}
