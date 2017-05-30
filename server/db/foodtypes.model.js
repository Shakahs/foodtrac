const { Model } = require('objection');

class FoodTypes extends Model {
  static get tableName() {
    return 'FoodTypes';
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
          maxLength: 15,
        },
      },
    };
  }

  static get relationMappings() {
    return {
      menu_items: {
        relation: Model.HasManyRelation,
        modelClass: `${__dirname}/menuitems.model`,
        join: {
          from: 'FoodTypes.id',
          to: 'MenuItems.food_type_id',
        },
      },
    };
  }
}

module.exports = FoodTypes;
