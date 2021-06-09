import { Article } from 'generated/graphql';
import { Context } from 'types/context';

const articles = async (root: object, args: any, ctx: Context): Promise<Article[]> => ctx.knex('article').select('id', 'content', 'title', 'createdById');

export default articles;
