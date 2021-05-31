import { MutationCreateUserArgs, User } from 'generated/graphql';
import { DB } from 'types/db';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const createUser = async (root: object, args: MutationCreateUserArgs, db: DB): Promise<User | null> => {
  // Retrieve input
  const { email, password } = args.input;

  // Generate userId, token and hashed pw
  const userId = uuidv4();
  const tokenId = uuidv4();

  const token = jwt.sign(tokenId, 'mySecret');
  const hashedPassword = await bcrypt.hash(password, 10);

  await db.execute(
    `
  INSERT INTO
    users (id, email, password)
  VALUES
    (?, ?, ?)
  `,
    [userId, email, hashedPassword],
  );

  await db.execute(
    `
    INSERT INTO
      user_tokens (id, createdAt, token, tokenId, userId)
    VALUES
      (?, ?, ?, ?, ?)
    `,
    [uuidv4(), new Date(), token, tokenId, userId],
  );

  const [user] = await db.execute<User[]>(
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

  if (user) {
    return {
      ...user,
      token,
    };
  }

  return null;
};

export default createUser;
