import { User } from 'generated/graphql';
import { Context } from 'types/context';

const users = async (root: object, args: any, ctx: Context): Promise<User[]> => {
  const { currentUser } = ctx;

  if (!currentUser) return [];

  const query = `
  SELECT
    id, email, password
  FROM
    users
  `;

  const [rows] = await ctx.db.execute<User[]>(query);

  return rows;
};

export default users;
