const { Model } = require('objection');

class OrderItems extends Model {
  static get tableName() {
    return 'OrderItems';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['order_id', 'menu_item_id'],

      properties: {
        order_id: { type: 'integer' },
        menu_item_id: { type: 'integer' },
      },
    };
  }

  static get relationMappings() {
    return {
      order: {
        relation: Model.BelongsToOneRelation,
        modelClass: `${__dirname}/orders.model`,
        join: {
          from: 'OrderItems.order_id',
          to: 'Orders.id',
        },
      },
      menu_item: {
        relation: Model.BelongsToOneRelation,
        modelClass: `${__dirname}/menuitems.model`,
        join: {
          from: 'OrderItems.menu_item_id',
          to: 'MenuItems.id',
        },
      },
    };
  }

}

module.exports = OrderItems;
