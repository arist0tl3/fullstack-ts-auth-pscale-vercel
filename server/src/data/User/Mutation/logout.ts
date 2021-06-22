import { Context } from 'types/context';
import jwt from 'jsonwebtoken';

import stripBearerFromAuthHeader from 'utils/stripBearerFromAuthHeader';

import UserTokenModel from 'models/UserToken';

const { JWT_SECRET = 'jwtSecret' } = process.env;

export default async function logout(root: object, args: any, ctx: Context): Promise<boolean> {
  const authHeader = ctx.headers?.authorization || '';
  const token = stripBearerFromAuthHeader(authHeader);

  const { ok, result } = await new Promise((resolve) => {
    jwt.verify(token, JWT_SECRET, (err, verifyResult) => {
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

  if (!ok) return false;

  const tokenId = result;

  const userToken = await UserTokenModel.query().findById(tokenId);

  if (!userToken || !userToken.id) return false;

  // Revoke the current token
  await UserTokenModel.query()
    .patch({
      revoked: true,
      revokedAt: new Date(),
      revokedReason: 'logout',
    })
    .findById(tokenId);

  return true;
}
