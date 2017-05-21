const { Model } = require('objection');
const Brands = require('./brands.model');

class FoodGenres extends Model {
  static get tableName() {
    return 'FoodGenres';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['name'],

      properties: {
        id: { type: 'integer' },
        name: { type: 'string', minLength: 1, maxLength: 20 },
      },
    };
  }

  static get relationMappings() {
    return {
      brands: {
        relation: Model.HasManyRelation,
        modelClass: Brands,
        join: {
          from: 'FoodGenres.id',
          to: 'Brands.food_genre_id',
        },
      },
    };
  }
}

module.exports = FoodGenres;
