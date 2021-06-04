import { MutationCreateItemArgs, Item } from 'generated/graphql';
import { Context } from 'types/context';
import { v4 as uuidv4 } from 'uuid';

const createItem = async (root: object, args: MutationCreateItemArgs, ctx: Context): Promise<Item | null> => {
  // Check for current user
  const { currentUser } = ctx;

  if (!currentUser || !currentUser.id) throw new Error('Missing user data');

  // Retrieve input
  const { description, name } = args.input;

  // Generate itemId
  const itemId = uuidv4();

  console.log(itemId, description, name, currentUser.id);

  await ctx.db.execute(
    `
  INSERT INTO
    items (id, description, name, userId)
  VALUES
    (?, ?, ?, ?)
  `,
    [itemId, description, name, currentUser.id],
  );

  const [items] = await ctx.db.execute<Item[]>(
    `
  SELECT
    id, description, name, userId
  FROM
    items
  WHERE
    id = ?
  `,
    [itemId],
  );

  if (items) return items[0];

  return null;
};

export default createItem;
