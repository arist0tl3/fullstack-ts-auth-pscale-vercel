import { MutationCreateItemArgs, Item } from 'generated/graphql';
import { Context } from 'types/context';
import { v4 as uuidv4 } from 'uuid';

const createItem = async (root: object, args: MutationCreateItemArgs, ctx: Context): Promise<Item | null> => {
  const { currentUser, kdb } = ctx;

  // Check for current user
  if (!currentUser || !currentUser.id) throw new Error('Missing user data');

  // Retrieve input
  const { description, name } = args.input;

  // Generate itemId
  const itemId = uuidv4();

  await kdb('items').insert({ id: itemId, description, name, user_id: currentUser.id });

  return kdb('items').select('id', 'description', 'name').where({ id: itemId }).first();
};

export default createItem;
