import { gql } from '@apollo/client';

const CURRENT_USER = gql`
  query {
    currentUser {
      id
      email
    }
  }
`;

export default CURRENT_USER;
