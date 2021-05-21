import { gql } from 'apollo-server-express';

import user from './User/type';

const root = gql`
  type Query {
    root: String
  }
  type Mutation {
    root: String
  }
`;

const types = [
  root,
  user,
];

export default types;
