import { resolvers as graphqlScalarsResolvers } from 'graphql-scalars';

import UserResolvers from './User/resolvers';

const rootResolver = {
  Query: {
    root: () => 'query',
  },
  Mutation: {
    root: () => 'mutation',
  },
};

const resolvers = {
  ...graphqlScalarsResolvers,
  ...rootResolver,
  ...UserResolvers,
};

export default resolvers;
