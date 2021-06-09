import { gql } from 'apollo-server-express';

const comment = gql`
  type Comment {
    id: String
    commentId: String
    createdAt: DateTime
    createdBy: User
    createdById: String
  }

  input CreateCommentInput {
    commentId: String!
    content: String!
  }

  extend type Mutation {
    createComment(input: CreateCommentInput!): Comment
  }
`;

export default comment;
