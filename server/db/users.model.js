const { Model } = require('objection');

class Users extends Model {
  static get tableName() {
    return 'Users';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['email', 'is_truck_owner', 'auth0_id'],

      properties: {
        id: { type: 'integer' },
        email: {
          type: 'string',
          format: 'email',
          faker: 'internet.email',
        },
        is_truck_owner: { type: 'boolean' },
        auth0_id: {
          type: 'string',
          minLength: 5,
          maxLength: 30,
          pattern: String.raw`^(\w+)\|(\d+)$`,
        },
      },
    };
  }

  static get relationMappings() {
    return {
      user_follows: {
        relation: Model.ManyToManyRelation,
        modelClass: `${__dirname}/brands.model`,
        join: {
          from: 'Users.id',
          through: {
            from: 'UserFollows.user_id',
            to: 'UserFollows.brand_id',
          },
          to: 'Brands.id',
        },
      },
      brands: {
        relation: Model.HasManyRelation,
        modelClass: `${__dirname}/brands.model`,
        join: {
          from: 'Users.id',
          to: 'Brands.owner_id',
        },
      },
    };
  }
}

module.exports = Users;
