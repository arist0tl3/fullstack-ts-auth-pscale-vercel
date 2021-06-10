import { MutationCreateCommentArgs, Comment } from 'generated/graphql';
import { Context } from 'types/context';
import { v4 as uuidv4 } from 'uuid';

const createComment = async (root: object, args: MutationCreateCommentArgs, ctx: Context): Promise<Comment | null> => {
  const { currentUser, knex } = ctx;
  const { articleId } = args.input;

  // Check for current user
  if (!currentUser || !currentUser.id) throw new Error('Missing user data');

  // Retrieve input
  const { content } = args.input;

  // Generate commentId
  const commentId = uuidv4();

  await knex('comment').insert({ id: commentId, articleId, content, createdById: currentUser.id });

  return knex('comment').select('id', 'content', 'createdById').where({ id: commentId }).first();
};

export default createComment;
