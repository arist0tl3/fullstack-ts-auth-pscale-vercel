import { IResolvers } from 'apollo-server-express';
import { resolvers as graphqlScalarsResolvers } from 'graphql-scalars';
import merge from 'deepmerge';

import ItemResolvers from './Item/resolvers';
import UserResolvers from './User/resolvers';

const rootResolver = {
  Query: {
    root: () => 'query',
  },
  Mutation: {
    root: () => 'mutation',
  },
};

const resolvers = merge.all([
  graphqlScalarsResolvers,
  rootResolver,
  ItemResolvers,
  UserResolvers,
]) as IResolvers;

console.log('r', resolvers);

export default resolvers;
