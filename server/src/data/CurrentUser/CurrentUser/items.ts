import { Context } from 'types/context';
import { Item } from 'generated/graphql';

const items = async (root: object, args: any, ctx: Context): Promise<Item[]> => {
  if (!ctx.currentUser) return [];

  const { id: userId } = ctx.currentUser;

  return ctx.knex('items').select('id', 'name', 'description').where({ user_id: userId });
};

export default items;
