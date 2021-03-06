import { gql } from '@apollo/client';

const CREATE_COMMENT = gql`
  mutation CreateComment($input: CreateCommentInput!) {
    createComment(input: $input) {
      id
      content
    }
  }
`;

export default CREATE_COMMENT;
