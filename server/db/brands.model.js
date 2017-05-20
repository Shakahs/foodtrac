const { Model } = require('objection');
const Users = require('./users.model');
const Trucks = require('./trucks.model');

class Brands extends Model {
  static get tableName() {
    return 'Brands';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['owner_id', 'truck_id', 'name', 'description'],

      properties: {
        id: { type: 'integer' },
        owner_id: { type: 'integer' },
        truck_id: { type: 'integer' },
        name: { type: 'string', minLength: 1, maxLength: 30 },
        description: { type: 'text' },
        food_genre_id: { type: 'integer' },
        rewards_trigger: { type: 'integer', default: 10 },
        default_coupon: { type: 'integer' },
      },
    };
  }

  static get relationMappings() {
    return {
      owners: {
        relation: Model.BelongsToOneRelation,
        modelClass: Users,
        join: {
          from: 'Brands.owner_id',
          to: 'Users.id',
        },
      },
      user_follows: {
        relation: Model.ManyToManyRelation,
        modelClass: Users,
        join: {
          from: 'Brands.id',
          through: {
            from: 'UserFollows.brand_id',
            to: 'UserFollows.user_id',
          },
          to: 'User.id',
        },
      },
      trucks: {
        relation: Model.HasManyRelation,
        modelClass: Trucks,
        join: {
          from: 'Brands.id',
          to: 'trucks.brand_id',
        },
      },
    };
  }
}

module.exports = Brands;
