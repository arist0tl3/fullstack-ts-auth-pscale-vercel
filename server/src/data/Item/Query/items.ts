import { Item } from 'generated/graphql';
import { Context } from 'types/context';

const items = async (root: object, args: any, ctx: Context): Promise<Item[]> => ctx.kdb('items').select('id', 'name', 'description');

export default items;
