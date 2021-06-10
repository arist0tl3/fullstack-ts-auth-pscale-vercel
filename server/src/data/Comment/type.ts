import { gql } from 'apollo-server-express';

const comment = gql`
  type Comment {
    id: String
    articleId: String
    createdAt: DateTime
    createdBy: User
    createdById: String
  }

  input CreateCommentInput {
    articleId: String!
    content: String!
  }

  extend type Mutation {
    createComment(input: CreateCommentInput!): Comment
  }
`;

export default comment;
