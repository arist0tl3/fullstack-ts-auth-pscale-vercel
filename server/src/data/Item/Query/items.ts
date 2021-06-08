import { Item } from 'generated/graphql';
import { Context } from 'types/context';

const items = async (root: object, args: any, ctx: Context): Promise<Item[]> => ctx.knex('items').select('id', 'name', 'description', 'user_id');

export default items;
