import { User } from 'generated/graphql';
import { Context } from 'types/context';

const users = async (root: object, args: any, ctx: Context): Promise<User[]> => {
  const query = `
  SELECT
    BIN_TO_UUID(id) id, email, password
  FROM
    users
  `;

  const [rows] = await ctx.db.execute(query);

  return rows as User[];
};

export default users;
