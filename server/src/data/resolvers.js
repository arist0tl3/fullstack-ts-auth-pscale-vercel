import merge from 'deepmerge';

import user from './User/resolver';

const root = {
  Query: {
    root: () => 'query',
  },
  Mutation: {
    root: () => 'mutation',
  },
};

const resolvers = merge.all([
  root,
  user,
]);

export default resolvers;
