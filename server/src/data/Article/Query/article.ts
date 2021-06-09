import { Article, QueryArticleArgs } from 'generated/graphql';
import { Context } from 'types/context';

const article = async (root: object, args: QueryArticleArgs, ctx: Context): Promise<Article> => ctx.knex('article').select('id', 'content', 'title', 'createdById', 'createdAt').where({ id: args.input.articleId }).first();

export default article;
