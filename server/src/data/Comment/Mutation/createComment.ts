import { MutationCreateCommentArgs, Comment } from 'generated/graphql';
import { Context } from 'types/context';
import { v4 as uuidv4 } from 'uuid';

import { GraphQLResolveInfo } from 'graphql';

import CommentModel from 'models/Comment';
import resolveGraph from 'models/resolveGraph';

const createComment = async (root: object, args: MutationCreateCommentArgs, ctx: Context, info: GraphQLResolveInfo): Promise<Comment | null> => {
  const { currentUser } = ctx;
  const { articleId } = args.input;

  // Check for current user
  if (!currentUser || !currentUser.id) throw new Error('Missing user data');

  // Retrieve input
  const { content } = args.input;

  // Generate commentId
  const commentId = uuidv4();

  await CommentModel.query().insert({
    id: commentId,
    articleId,
    content,
    createdById: currentUser.id,
  });

  // Return as a graph to automatically resolve any fields
  return resolveGraph(ctx, info, CommentModel.query().findById(commentId));
};

export default createComment;
