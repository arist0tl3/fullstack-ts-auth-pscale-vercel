import { MutationLoginArgs, User } from 'generated/graphql';
import { Context } from 'types/context';

import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { GraphQLResolveInfo } from 'graphql';

import resolveGraph from 'models/resolveGraph';
import UserModel from 'models/User';
import UserTokenModel from 'models/UserToken';

const logout = async (root: object, args: MutationLoginArgs, ctx: Context, info: GraphQLResolveInfo): Promise<User | null> => {
  ctx.headers.authorization
};
