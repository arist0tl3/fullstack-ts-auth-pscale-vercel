import { gql } from 'apollo-server-express';

const currentUser = gql`
  type CurrentUser {
    id: String
    email: String
    token: String

    items: [Item]
  }

  extend type Query {
    currentUser: CurrentUser
  }
`;

export default currentUser;
