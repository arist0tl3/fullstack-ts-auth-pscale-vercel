import { MutationLoginArgs, User } from 'generated/graphql';

import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import UserModel from 'models/User';
import UserTokenModel from 'models/UserToken';

const login = async (root: object, args: MutationLoginArgs): Promise<User | null> => {
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

  const { user: userAsGraph } = await UserTokenModel.query().findById(tokenId).withGraphFetched('user');

  return {
    ...userAsGraph,
    token,
  };
};

export default login;
