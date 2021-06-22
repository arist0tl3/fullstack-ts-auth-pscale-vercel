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

  input LoginInput {
    email: String!
    password: String!
  }

  extend type Mutation {
    createUser(input: CreateUserInput!): User
    login(input: LoginInput!): User
    logout: Boolean
  }
`;

export default user;
