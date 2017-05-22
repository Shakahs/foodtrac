const { Model } = require('objection');
const Users = require('./users.model');
const FoodGenres = require('./foodgenres.model');
const Trucks = require('./trucks.model');

class Brands extends Model {
  static get tableName() {
    return 'Brands';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['owner_id', 'name', 'description', 'food_genre_id'],

      properties: {
        id: { type: 'integer' },
        owner_id: { type: 'integer' },
        name: { type: 'string', minLength: 1, maxLength: 30 },
        description: { type: 'string', minLength: 1, maxLength: 255 },
        food_genre_id: { type: 'integer' },
        rewards_trigger: { type: ['integer', 'null'], default: null },
        default_coupon_id: { type: ['integer', 'null'], default: null },
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
      food_genres: {
        relation: Model.BelongsToOneRelation,
        modelClass: FoodGenres,
        join: {
          from: 'Brands.food_genre_id',
          to: 'FoodGenres.id',
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
          to: 'Users.id',
        },
      },
      trucks: {
        relation: Model.HasManyRelation,
        modelClass: Trucks,
        join: {
          from: 'Brands.id',
          to: 'Trucks.brand_id',
        },
      },
    };
  }
}

module.exports = Brands;
