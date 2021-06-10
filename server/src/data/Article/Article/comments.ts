import { Context } from 'types/context';
import { Article, Comment } from 'generated/graphql';

const comments = async (root: Article, args: any, ctx: Context): Promise<Comment[] | null> => {
  if (!root.id) return null;

  return ctx.knex('comment').select('id', 'content', 'createdById').where({ articleId: root.id });
};

export default comments;
