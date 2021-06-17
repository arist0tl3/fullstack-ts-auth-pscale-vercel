import { gql } from '@apollo/client';

const ARTICLES = gql`
  query Articles ($input: ArticlesQueryInput!) {
    articles(input: $input){
      id
      createdBy {
        id
        email
      }
      content
      createdAt
      title
    }
  }
`;

export default ARTICLES;
