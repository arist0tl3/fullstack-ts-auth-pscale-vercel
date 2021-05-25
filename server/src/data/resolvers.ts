import { MutationResolvers, QueryResolvers } from '../generated/graphql';

import users from './User/Query/users';

interface Resolvers {
  Query: QueryResolvers;
  Mutation: MutationResolvers;
}

const resolvers: Resolvers = {
  Query: {
    root: () => 'query',
    users,
  },
  Mutation: {
    root: () => 'mutation',
  },
};

export default resolvers;
