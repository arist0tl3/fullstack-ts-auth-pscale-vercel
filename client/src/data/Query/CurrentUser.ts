import { gql } from '@apollo/client';

const CURRENT_USER = gql`
  query {
    currentUser {
      id
      email
      token
    }
  }
`;

export default CURRENT_USER;
