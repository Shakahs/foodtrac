const { Model } = require('objection');

class UserRewards extends Model {
  static get tableName() {
    return 'UserRewards';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['brand_id', 'user_id', 'count'],

      properties: {
        brand_id: { type: 'integer' },
        user_id: { type: 'integer' },
        count: { type: 'integer', default: 0 },
      },
    };
  }

  static get relationMappings() {
    return {
      brands: {
        relation: Model.BelongsToOneRelation,
        modelClass: `${__dirname}/brands.model`,
        join: {
          from: 'UserRewards.brand_id',
          to: 'Brands.id',
        },
      },
      users: {
        relation: Model.BelongsToOneRelation,
        modelClass: `${__dirname}/users.model`,
        join: {
          from: 'UserRewards.user_id',
          to: 'Users.id',
        },
      },
      user_coupons: {
        relation: Model.HasManyRelation,
        modelClass: `${__dirname}/usercoupons.model`,
        join: {
          from: 'UserRewards.id',
          to: 'UserCoupons.user_reward_id',
        },
      },
      coupons: {
        relation: Model.ManyToManyRelation,
        modelClass: `${__dirname}/coupons.model`,
        join: {
          from: 'UserRewards.id',
          through: {
            from: 'UserCoupons.user_reward_id',
            to: 'UserCoupons.coupon_id',
          },
          to: 'Coupons.id',
        },
      },
    };
  }
}

module.exports = UserRewards;
