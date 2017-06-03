const { Model } = require('objection');

class Coupons extends Model {
  static get tableName() {
    return 'Coupons';
  }

  static get jsonSchema() {
    return {
      type: 'object',

      properties: {
        percent_discount: { type: 'integer' },
        flat_discount: { type: 'integer' },
      },
    };
  }

  static get relationMappings() {
    return {
      brands: {
        relation: Model.HasManyRelation,
        modelClass: `${__dirname}/orderitems.model`,
        join: {
          from: 'Coupons.id',
          to: 'Brands.default_coupon_id',
        },
      },
    };
  }
}

module.exports = Coupons;
