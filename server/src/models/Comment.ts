import { Model } from 'objection';

export default class CommentModel extends Model {
  static tableName = 'comment';

  static get modelPaths() {
    return [__dirname];
  }

  id!: string
  articleId!: string
  content!: string
  createdById!: string
  createdAt!: Date
  createdBy!: any

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['content', 'createdById'],

      properties: {
        id: { type: 'string', length: 36 },
        content: { type: 'string', minLength: 1, maxLength: 255 },
        createdById: { type: 'string', length: 36 },
        createdAt: { type: 'Date' },
      },
    };
  }

  static get relationMappings() {
    return {
      createdBy: {
        relation: Model.HasOneRelation,
        modelClass: 'User',
        join: {
          from: 'comment.createdById',
          to: 'user.id',
        },
      },
    };
  }
}
