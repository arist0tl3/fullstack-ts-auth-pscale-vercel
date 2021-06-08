import DataLoader from 'dataloader';
import { Context } from 'types/context';
import { Item, User } from 'generated/graphql';

const user = async (root: Item, args: any, ctx: Context): Promise<User | null> => {
  if (!root.user_id) return null;

  const userLoader = new DataLoader((keys) => {
    const result = keys.map((userId) => {
      return ctx.knex('users').select('id', 'email').where({ id: userId }).first();
    });

    return Promise.resolve(result);
  });

  return userLoader.load(root.user_id);
};

export default user;
