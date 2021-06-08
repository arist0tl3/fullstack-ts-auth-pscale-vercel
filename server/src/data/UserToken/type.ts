import { gql } from 'apollo-server-express';

const userToken = gql`
  type UserToken {
    id: String!
    expiresAt: Date
    revoked: Boolean
    revokedAt: Date
    revokedReason: String
    token: String
    user_id: String
  }
`;

export default userToken;
