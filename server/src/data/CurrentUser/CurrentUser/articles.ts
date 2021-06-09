import { Context } from 'types/context';
import { Article } from 'generated/graphql';

const articles = async (root: object, args: any, ctx: Context): Promise<Article[]> => {
  if (!ctx.currentUser) return [];

  const { id: userId } = ctx.currentUser;

  return ctx.knex('article').select('id', 'content', 'title').where({ createdBy: userId });
};

export default articles;
