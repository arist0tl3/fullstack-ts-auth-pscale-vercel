import { Article, QueryArticleArgs } from 'generated/graphql';
import { Context } from 'types/context';
import { GraphQLResolveInfo } from 'graphql';

import ArticleModel from 'models/Article';
import resolveGraph from 'models/resolveGraph';

const article = async (root: object, args: QueryArticleArgs, ctx: Context, info: GraphQLResolveInfo): Promise<Article> => {
  return resolveGraph(ctx, info, ArticleModel.query().findById(args.input.articleId));
};

export default article;
