import { gql } from 'apollo-server-express';

const user = gql`
  type User {
    id: String!
    email: String!
  }

  extend type Query {
    users: [User]!
  }
`;

export default user;
