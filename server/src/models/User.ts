import { Model } from 'objection';

export default class UserModel extends Model {
  static tableName = 'user';

  static get modelPaths() {
    return [__dirname];
  }

  id!: string
  email!: string
  password!: string
  createdAt!: Date

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['email', 'password'],

      properties: {
        id: { type: 'string', length: 36 },
        email: { type: 'string', minLength: 1, maxLength: 255 },
        password: { type: 'string', minLength: 1, maxLength: 255 },
        createdAt: { type: 'Date' },
      },
    };
  }

  static get relationMappings() {
    return {
      articles: {
        relation: Model.HasManyRelation,
        modelClass: 'Article',
        join: {
          from: 'user.id',
          to: 'article.createdById',
        },
      },
    };
  }
}
