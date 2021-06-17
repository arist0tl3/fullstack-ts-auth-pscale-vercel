import { GraphResolver, ModelResolver } from 'objection-graphql-resolver';

import ArticleModel from 'models/Article';
import CommentModel from 'models/Comment';
import UserModel from 'models/User';

const resolveGraph = GraphResolver({
  Article: ModelResolver(ArticleModel, {
    fields: {
      id: true,
      comments: true,
      content: true,
      title: true,
      createdAt: true,
      createdBy: true,
    },
  }),
  Comment: ModelResolver(CommentModel, {
    fields: {
      id: true,
      content: true,
      createdAt: true,
      createdBy: true,
    },
  }),
  CurrentUser: ModelResolver(UserModel, {
    fields: {
      id: true,
      email: true,
    },
  }),
  User: ModelResolver(UserModel, {
    fields: {
      id: true,
      email: true,
    },
  }),
});

export default resolveGraph;
