import { gql } from 'apollo-server-express';
import { typeDefs as graphqlScalarsTypeDefs } from 'graphql-scalars';

import item from './Item/type';
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
  item,
  user,
  userToken,
];

export default types;
