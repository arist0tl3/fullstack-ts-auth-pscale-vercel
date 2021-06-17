import { User } from 'generated/graphql';
import { Context } from 'types/context';
import { GraphQLResolveInfo } from 'graphql';

import UserModel from 'models/User';
import resolveGraph from 'models/resolveGraph';

const currentUser = async (root: object, args: any, ctx: Context, info: GraphQLResolveInfo): Promise<User | null> => {
  if (!ctx?.currentUser?.id) return null;

  return resolveGraph(ctx, info, UserModel.query().findById(ctx.currentUser.id));
};

export default currentUser;
