const { Model } = require('objection');

class BrandReviews extends Model {
  static get tableName() {
    return 'BrandReviews';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['text', 'score', 'user_id', 'brand_id'],

      properties: {
        id: { type: 'integer' },
        title: { type: 'string' },
        text: { type: 'string' },
        score: { type: 'integer' },
        user_id: { type: 'integer' },
        brand_id: { type: 'integer' },
      },
    };
  }

  static get relationMappings() {
    return {
      brands: {
        relation: Model.BelongsToOneRelation,
        modelClass: `${__dirname}/brands.model`,
        join: {
          from: 'BrandReviews.brand_id',
          to: 'Brands.id',
        },
      },
      users: {
        relation: Model.BelongsToOneRelation,
        modelClass: `${__dirname}/users.model`,
        join: {
          from: 'BrandReviews.user_id',
          to: 'Users.id',
        },
      },
    };
  }
}

module.exports = BrandReviews;
