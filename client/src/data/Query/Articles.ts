import { gql } from '@apollo/client';

const ARTICLES = gql`
  query {
    articles {
      id
      createdBy {
        id
        email
      }
      content
      title
    }
  }
`;

export default ARTICLES;
