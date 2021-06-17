import { Model } from 'objection';

export default class ArticleModel extends Model {
  static tableName = 'article';

  static get modelPaths() {
    return [__dirname];
  }

  id!: string
  content!: string
  title!: string
  createdById!: string
  createdAt!: Date

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['content', 'title', 'createdById'],

      properties: {
        id: { type: 'string', length: 36 },
        content: { type: 'string', minLength: 1, maxLength: 255 },
        title: { type: 'string', minLength: 1, maxLength: 255 },
        createdById: { type: 'string', length: 36 },
        createdAt: { type: 'Date' },
      },
    };
  }

  static get relationMappings() {
    return {
      comments: {
        relation: Model.HasManyRelation,
        modelClass: 'Comment',
        join: {
          from: 'article.id',
          to: 'comment.articleId',
        },
      },

      createdBy: {
        relation: Model.HasOneRelation,
        modelClass: 'User',
        join: {
          from: 'article.createdById',
          to: 'user.id',
        },
      },
    };
  }
}
