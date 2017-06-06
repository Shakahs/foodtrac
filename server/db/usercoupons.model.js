const { Model } = require('objection');

class UserCoupons extends Model {
  static get tableName() {
    return 'UserCoupons';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['redeemed', 'coupon_id', 'user_reward_id'],

      properties: {
        redeemed: { type: 'boolean', default: false },
        coupon_id: { type: 'integer' },
        user_reward_id: { type: 'integer' },
      },
    };
  }

  static get relationMappings() {
    return {
      coupons: {
        relation: Model.HasManyRelation,
        modelClass: `${__dirname}/coupons.model`,
        join: {
          from: 'UserCoupons.coupon_id',
          to: 'Coupons.id',
        },
      },
      rewards: {
        relation: Model.HasManyRelation,
        modelClass: `${__dirname}/userrewards.model`,
        join: {
          from: 'UserCoupons.user_reward_id',
          to: 'UserRewards.id',
        },
      },
    };
  }
}

module.exports = UserCoupons;
