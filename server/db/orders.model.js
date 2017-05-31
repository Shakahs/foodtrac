const { Model } = require('objection');

class Orders extends Model {
  static get tableName() {
    return 'Orders';
  }

// Add user_coupon_id if needed

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['user_id', 'truck_id', 'date', 'ready'],

      properties: {
        user_id: { type: 'integer' },
        truck_id: { type: 'integer' },
        date: { type: 'string' },
        ready: { type: 'boolean' },
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
    };
  }
}

module.exports = Orders;
