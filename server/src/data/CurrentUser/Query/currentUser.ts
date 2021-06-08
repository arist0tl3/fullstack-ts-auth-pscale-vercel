import { User } from 'generated/graphql';
import { Context } from 'types/context';

const currentUser = async (root: object, args: any, ctx: Context): Promise<User | null> => {
  if (!ctx.currentUser) return null;

  const { id } = ctx.currentUser;

  return ctx.knex('users').select('id', 'email', 'password').where({ id }).first();
};

export default currentUser;
