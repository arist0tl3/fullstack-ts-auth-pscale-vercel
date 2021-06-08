import { User } from 'generated/graphql';
import { Context } from 'types/context';

const users = async (root: object, args: any, ctx: Context): Promise<User[]> => ctx.knex('users').select('id', 'email', 'password');

export default users;
