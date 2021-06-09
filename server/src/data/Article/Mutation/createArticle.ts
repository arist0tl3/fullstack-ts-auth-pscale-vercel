import { MutationCreateArticleArgs, Article } from 'generated/graphql';
import { Context } from 'types/context';
import { v4 as uuidv4 } from 'uuid';

const createArticle = async (root: object, args: MutationCreateArticleArgs, ctx: Context): Promise<Article | null> => {
  const { currentUser, knex } = ctx;

  // Check for current user
  if (!currentUser || !currentUser.id) throw new Error('Missing user data');

  // Retrieve input
  const { content, title } = args.input;

  // Generate articleId
  const articleId = uuidv4();

  await knex('article').insert({ id: articleId, content, title, createdById: currentUser.id });

  return knex('article').select('id', 'content', 'title').where({ id: articleId }).first();
};

export default createArticle;
