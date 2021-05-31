import { User } from 'generated/graphql';
import { DB } from 'types/db';

const users = async (root: object, args: any, db: DB): Promise<User[]> => {
  const query = `
  SELECT
    BIN_TO_UUID(id) id, email, password
  FROM
    users
  `;

  const [rows] = await db.execute<User[]>(query);

  return rows;
};

export default users;
