import { MutationCreateUserArgs, User } from 'generated/graphql';
import { Context } from 'types/context';

import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { GraphQLResolveInfo } from 'graphql';

import resolveGraph from 'models/resolveGraph';
import UserModel from 'models/User';
import UserTokenModel from 'models/UserToken';

const createUser = async (root: object, args: MutationCreateUserArgs, ctx: Context, info: GraphQLResolveInfo): Promise<User | null> => {
  // Retrieve input
  const { email, password } = args.input;

  // Generate userId, token and hashed pw
  const userId = uuidv4();
  const tokenId = uuidv4();

  const token = jwt.sign(tokenId, 'mySecret');
  const hashedPassword = await bcrypt.hash(password, 10);

  await UserModel.query().insert({
    id: userId,
    email,
    password: hashedPassword,
  });

  await UserTokenModel.query().insert({
    id: tokenId,
    userId,
  });

  // Return as a graph to automatically resolve any fields
  const user = resolveGraph(ctx, info, UserModel.query().findById(userId));

  return {
    ...user,
    token,
  };
};

export default createUser;
