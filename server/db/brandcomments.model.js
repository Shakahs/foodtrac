const { Model } = require('objection');

class BrandComments extends Model {
  static get tableName() {
    return 'BrandComments';
  }

  $beforeInsert() {
    this.created_at = new Date().toISOString();
  }

  $beforeUpdate() {
    this.updated_at = new Date().toISOString();
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['text', 'user_id', 'brand_id'],

      properties: {
        id: { type: 'integer' },
        text: { type: 'string' },
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
          from: 'BrandComments.brand_id',
          to: 'Brands.id',
        },
      },
      users: {
        relation: Model.BelongsToOneRelation,
        modelClass: `${__dirname}/users.model`,
        join: {
          from: 'BrandComments.user_id',
          to: 'Users.id',
        },
      },
    };
  }
}

module.exports = BrandComments;
