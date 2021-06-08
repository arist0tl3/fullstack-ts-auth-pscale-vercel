import { IResolvers } from 'apollo-server-express';
import { resolvers as graphqlScalarsResolvers } from 'graphql-scalars';
import merge from 'deepmerge';

import CurrentUserResolvers from './CurrentUser/resolvers';
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
  CurrentUserResolvers,
  ItemResolvers,
  UserResolvers,
]) as IResolvers;

export default resolvers;
