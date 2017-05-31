const { Model } = require('objection');

class MenuItems extends Model {
  static get tableName() {
    return 'MenuItems';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['brand_id', 'name', 'price', 'calories', 'description', 'food_type_id'],

      properties: {
        id: { type: 'integer' },
        brand_id: { type: 'integer' },
        name: {
          type: 'string',
          minLength: 1,
          maxLength: 30,
        },
        price: {
          type: 'integer',
          minimum: 0,
          maximum: 10000,
        },
        calories: {
          type: 'integer',
          minimum: 0,
          maximum: 2000,
        },
        description: {
          type: 'string',
          minLength: 1,
          maxLength: 100,
        },
        food_type_id: {
          type: 'integer',
          minimum: 1,
          maximum: 5,
        },
      },
    };
  }

  static get relationMappings() {
    return {
      brands: {
        relation: Model.BelongsToOneRelation,
        modelClass: `${__dirname}/brands.model`,
        join: {
          from: 'MenuItems.brand_id',
          to: 'Brands.id',
        },
      },
    };
  }
}

module.exports = MenuItems;
