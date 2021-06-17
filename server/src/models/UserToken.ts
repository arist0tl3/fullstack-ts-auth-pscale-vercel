import { Model } from 'objection';
import { User } from 'generated/graphql';

export default class UserTokenModel extends Model {
  static tableName = 'userToken';

  static get modelPaths() {
    return [__dirname];
  }

  id!: string
  userId!: string
  revoked!: boolean
  revokedAt!: Date
  revokedReason!: string
  user!: User

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['userId'],

      properties: {
        id: { type: 'string', length: 36 },
        userId: { type: 'string', length: 36 },
      },
    };
  }

  static get relationMappings() {
    return {
      user: {
        relation: Model.HasOneRelation,
        modelClass: 'User',
        join: {
          from: 'userToken.userId',
          to: 'user.id',
        },
      },
    };
  }
}
