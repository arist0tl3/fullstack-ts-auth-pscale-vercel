import { MutationCreateArticleArgs, Article } from 'generated/graphql';
import { Context } from 'types/context';
import { v4 as uuidv4 } from 'uuid';

import { GraphQLResolveInfo } from 'graphql';

import ArticleModel from 'models/Article';
import resolveGraph from 'models/resolveGraph';

const createArticle = async (root: object, args: MutationCreateArticleArgs, ctx: Context, info: GraphQLResolveInfo): Promise<Article | null> => {
  const { currentUser } = ctx;

  // Check for current user
  if (!currentUser || !currentUser.id) throw new Error('Missing user data');

  // Retrieve input
  const { content, title } = args.input;

  // Generate articleId
  const articleId = uuidv4();

  await ArticleModel.query().insert({
    id: articleId,
    content,
    createdById: currentUser.id,
    title,
  });

  // Return as a graph to automatically resolve any fields
  return resolveGraph(ctx, info, ArticleModel.query().findById(articleId));
};

export default createArticle;
