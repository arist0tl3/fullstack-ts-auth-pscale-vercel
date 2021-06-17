import { gql } from 'apollo-server-express';

const article = gql`
  type Article {
    id: String!
    content: String!
    title: String!
    createdAt: DateTime
    createdBy: User
    createdById: String

    comments: [Comment!]
  }

  input CreateArticleInput {
    content: String!
    title: String!
  }

  input ArticleQueryInput {
    articleId: String!
  }

  extend type Mutation {
    createArticle(input: CreateArticleInput!): Article
  }

  extend type Query {
    article(input: ArticleQueryInput!): Article
    articles: [Article]!
  }
`;

export default article;
