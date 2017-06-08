const { Model } = require('objection');
const path = require('path');

class Images extends Model {
  static get tableName() {
    return 'Images';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['filename', 'user_id'],

      properties: {
        id: { type: 'integer' },
        filename: { type: 'string' },
        user_id: { type: 'integer' },
      },
    };
  }

  static get relationMappings() {
    return {
      brand_cover_image: {
        relation: Model.BelongsToOneRelation,
        modelClass: path.resolve(__dirname, '../', 'brands.model'),
        join: {
          from: 'Images.id',
          to: 'Brands.cover_image_id',
        },
      },
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: path.resolve(__dirname, '../', 'users.model'),
        join: {
          from: 'Images.user_id',
          to: 'Users.id',
        },
      },
    };
  }
}

module.exports = Images;
