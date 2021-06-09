import DataLoader from 'dataloader';
import { Context } from 'types/context';
import { Article, User } from 'generated/graphql';

const createdBy = async (root: Article, args: any, ctx: Context): Promise<User | null> => {
  if (!root.createdById) return null;

  const userLoader = new DataLoader((keys) => {
    const result = keys.map((userId) => {
      return ctx.knex('user').select('id', 'email').where({ id: userId }).first();
    });

    return Promise.resolve(result);
  });

  return userLoader.load(root.createdById);
};

export default createdBy;
