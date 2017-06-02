const { Model } = require('objection');

class Orders extends Model {
  static get tableName() {
    return 'Orders';
  }

// Add user_coupon_id if needed

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['user_id', 'truck_id', 'date', 'ready', 'name'],

      properties: {
        user_id: { type: 'integer' },
        truck_id: { type: 'integer' },
        date: { type: 'string' },
        ready: { type: 'boolean', default: false },
        name: { type: 'string' },
      },
    };
  }

  static get relationMappings() {
    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: `${__dirname}/users.model`,
        join: {
          from: 'Orders.user_id',
          to: 'Users.id',
        },
      },
      truck: {
        relation: Model.BelongsToOneRelation,
        modelClass: `${__dirname}/trucks.model`,
        join: {
          from: 'Orders.truck_id',
          to: 'Trucks.id',
        },
      },
      orderitems: {
        relation: Model.HasManyRelation,
        modelClass: `${__dirname}/orderitems.model`,
        join: {
          from: 'Orders.id',
          to: 'OrderItems.order_id',
        },
      },
    };
  }
}

module.exports = Orders;
