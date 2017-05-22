const { Model } = require('objection');

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
        name: {
          type: 'string',
          minLength: 1,
          maxLength: 20,
          chance: {
            pickone: [['Mexican', 'Korean', 'BBQ', 'Burgers', 'Grilled Cheese', 'Pho']],
          },
        },
      },
    };
  }

  static get relationMappings() {
    return {
      brands: {
        relation: Model.HasManyRelation,
        modelClass: `${__dirname}/brands.model`,
        join: {
          from: 'FoodGenres.id',
          to: 'Brands.food_genre_id',
        },
      },
    };
  }
}

module.exports = FoodGenres;
