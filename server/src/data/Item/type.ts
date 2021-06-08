import { gql } from 'apollo-server-express';

const item = gql`
  type Item {
    id: String
    description: String
    name: String
    user_id: String
  }

  input CreateItemInput {
    description: String!
    name: String!
  }

  extend type Mutation {
    createItem(input: CreateItemInput!): Item
  }

  extend type Query {
    items: [Item]!
  }
`;

export default item;
