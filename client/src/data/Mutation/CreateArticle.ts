import { gql } from '@apollo/client';

const CREATE_ARTICLE = gql`
  mutation CreateArticle($input: CreateArticleInput!) {
    createArticle(input: $input) {
      id
      content
      title
    }
  }
`;

export default CREATE_ARTICLE;
