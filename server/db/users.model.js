const { Model } = require('objection');
const Brands = require('./brands.model');

class Users extends Model {
  static get tableName() {
    return 'Users';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['email', 'is_truck_owner'],

      properties: {
        id: { type: 'integer' },
        email: { type: 'string', minLength: 1, maxLength: 30 },
        is_truck_owner: { type: 'boolean' },
      },
    };
  }

  static get relationMappings() {
    return {
      user_follows: {
        relation: Model.ManyToManyRelation,
        modelClass: Brands,
        join: {
          from: 'User.id',
          through: {
            from: 'UserFollows.brand_id',
            to: 'UserFollows.user_id',
          },
          to: 'Brand.id',
        },
      },
      brands: {
        relation: Model.HasManyRelation,
        modelClass: Brands,
        join: {
          from: 'Users.id',
          to: 'Brands.owner_id',
        },
      },
    };
  }
}

module.exports = Users;
