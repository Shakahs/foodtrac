const { Model } = require('objection');

class UserPushInfo extends Model {
  static get tableName() {
    return 'UserPushInfo';
  }

// Add user_coupon_id if needed

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['endpoint', 'auth', 'p256dh', 'user_id'],

      properties: {
        id: { type: 'integer' },
        endpoint: { type: 'string' },
        auth: { type: 'string' },
        p256dh: { type: 'string' },
        user_id: { type: 'integer' },
      },
    };
  }

  static get relationMappings() {
    return {
      users: {
        relation: Model.BelongsToOneRelation,
        modelClass: `${__dirname}/users.model`,
        join: {
          from: 'UserPushInfo.user_id',
          to: 'Users.id',
        },
      },
    };
  }
}

module.exports = UserPushInfo;
