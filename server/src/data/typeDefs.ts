import { gql } from 'apollo-server-express';
import { typeDefs as graphqlScalarsTypeDefs } from 'graphql-scalars';

import article from './Article/type';
import comment from './Comment/type';
import currentUser from './CurrentUser/type';
import user from './User/type';
import userToken from './UserToken/type';

const root = gql`
  type Query {
    root: String
  }
  type Mutation {
    root: String
  }
`;

const types = [
  ...graphqlScalarsTypeDefs,

  root,

  article,
  comment,
  currentUser,
  user,
  userToken,
];

export default types;
