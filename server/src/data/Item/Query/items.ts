import { Item } from 'generated/graphql';
import { Context } from 'types/context';

const items = async (root: object, args: any, ctx: Context): Promise<Item[]> => {
  const query = `
  SELECT
    id, name, description
  FROM
    items
  `;

  const [rows] = await ctx.db.execute<Item[]>(query);

  return rows;
};

export default items;
