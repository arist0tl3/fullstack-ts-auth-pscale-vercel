import { IResolvers } from 'apollo-server-express';
import { resolvers as graphqlScalarsResolvers } from 'graphql-scalars';
import merge from 'deepmerge';

import ArticleResolvers from './Article/resolvers';
import CommentResolvers from './Comment/resolvers';
import CurrentUserResolvers from './CurrentUser/resolvers';
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

  ArticleResolvers,
  CommentResolvers,
  CurrentUserResolvers,
  UserResolvers,
]) as IResolvers;

export default resolvers;
