import { Article } from 'generated/graphql';
import { Context } from 'types/context';
import { GraphQLResolveInfo } from 'graphql';

import ArticleModel from 'models/Article';
import resolveGraph from 'models/resolveGraph';

const articles = async (root: object, args: any, ctx: Context, info: GraphQLResolveInfo): Promise<Article[]> => {
  return resolveGraph(ctx, info, ArticleModel.query());
};

export default articles;
