import { gql } from 'apollo-server-express';

const userToken = gql`
  type UserToken {
    id: String!
    expiresAt: Date
    revoked: Boolean
    revokedAt: Date
    revokedReason: String
    token: String
    userId: String
  }
`;

export default userToken;
