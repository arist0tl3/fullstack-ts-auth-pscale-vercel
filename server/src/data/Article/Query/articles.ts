import { Article, QueryArticlesArgs } from 'generated/graphql';
import { Context } from 'types/context';
import { GraphQLResolveInfo } from 'graphql';

import ArticleModel from 'models/Article';
import resolveGraph from 'models/resolveGraph';

const articles = async (root: object, args: QueryArticlesArgs, ctx: Context, info: GraphQLResolveInfo): Promise<Article[]> => {
  console.log('ctx', ctx);
  return resolveGraph(ctx, info, ArticleModel.query().orderBy(args.input.orderBy, args.input.orderDirection));
};

export default articles;
