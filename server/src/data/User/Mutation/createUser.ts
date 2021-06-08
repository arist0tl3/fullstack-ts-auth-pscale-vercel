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

  await ctx.kdb('users').insert({ id: userId, email, password: hashedPassword });
  await ctx.kdb('user_tokens').insert({ id: tokenId, user_id: userId });

  const user = await ctx.kdb('users').select('id', 'email').where({ id: userId }).first();

  return {
    ...user,
    token,
  };
};

export default createUser;
