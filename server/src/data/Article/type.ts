import { gql } from 'apollo-server-express';

const article = gql`
  type Article {
    id: String
    content: String
    title: String
    createdAt: DateTime
    createdBy: User
    createdById: String
  }

  input CreateArticleInput {
    content: String!
    title: String!
  }

  extend type Mutation {
    createArticle(input: CreateArticleInput!): Article
  }

  extend type Query {
    articles: [Article]!
  }
`;

export default article;
