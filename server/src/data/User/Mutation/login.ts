import { MutationLoginUserArgs, User } from 'generated/graphql';
import { Context } from 'types/context';

import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { GraphQLResolveInfo } from 'graphql';

import resolveGraph from 'models/resolveGraph';
import UserModel from 'models/User';
import UserTokenModel from 'models/UserToken';

const login = async (root: object, args: MutationLoginUserArgs, ctx: Context, info: GraphQLResolveInfo): Promise<User | null> => {
  // Retrieve input
  const { email, password } = args.input;

  // Confirm user
  const user = await UserModel.query().where({ email }).first();
  if (!user) throw new Error('Cannot find user');

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) throw new Error('Bad password');

  // Generate a new token
  const tokenId = uuidv4();

  const token = jwt.sign(tokenId, 'mySecret');

  await UserTokenModel.query().insert({
    id: tokenId,
    userId: user.id,
  });

  // Return as a graph to automatically resolve any fields
  const userAsGraph = resolveGraph(ctx, info, UserModel.query().findById(user.id));

  return {
    ...userAsGraph,
    token,
  };
};

export default login;
