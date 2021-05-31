import { MutationCreateUserArgs, User } from 'generated/graphql';
import { Context } from 'types/context';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const createUser = async (root: object, args: MutationCreateUserArgs, ctx: Context): Promise<User | null> => {
  // Retrieve input
  const { email, password } = args.input;

  // Generate userId, token and hashed pw
  const userId = uuidv4();
  const tokenId = uuidv4();

  const token = jwt.sign(tokenId, 'mySecret');
  const hashedPassword = await bcrypt.hash(password, 10);

  await ctx.db.execute(
    `
  INSERT INTO
    users (id, email, password)
  VALUES
    (?, ?, ?)
  `,
    [userId, email, hashedPassword],
  );

  await ctx.db.execute(
    `
    INSERT INTO
      user_tokens (id, userId)
    VALUES
      (?, ?)
    `,
    [tokenId, userId],
  );

  const [users] = await ctx.db.execute<User[]>(
    `
  SELECT
    id, email
  FROM
    users
  WHERE
    id = ?
  `,
    [userId],
  );

  if (users) {
    const user = {
      ...users[0],
      token,
    };

    return user;
  }

  return null;
};

export default createUser;
