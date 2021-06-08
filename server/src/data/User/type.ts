import { gql } from 'apollo-server-express';

const user = gql`
  type User {
    id: String
    email: String
    token: String
  }

  input CreateUserInput {
    email: String!
    password: String!
  }

  extend type Mutation {
    createUser(input: CreateUserInput!): User
  }
`;

export default user;
