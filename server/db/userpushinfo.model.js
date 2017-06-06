const { Model } = require('objection');

class UserPushInfo extends Model {
  static get tableName() {
    return 'UserPushInfo';
  }

// Add user_coupon_id if needed

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['subscription', 'user_id'],

      properties: {
        id: { type: 'integer' },
        subscription: { type: 'string' },
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
