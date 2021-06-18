import { gql } from '@apollo/client';

const ARTICLE = gql`
  query Article($input: ArticleQueryInput!) {
    article(input: $input) {
      id
      title
      content
      createdAt
      createdBy {
        id
        email
      }
      comments {
        id
        content
        createdAt
        createdBy {
          id
          email
        }
      }
    }
  }
`;

export default ARTICLE;
