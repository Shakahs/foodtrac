const { Model } = require('objection');
const path = require('path');

class Users extends Model {
  static get tableName() {
    return 'Users';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['is_truck_owner', 'auth0_id'],

      properties: {
        id: { type: 'integer' },
        email: {
          type: 'string',
          format: 'email',
          chance: 'email',
          maxLength: 100,
        },
        is_truck_owner: {
          type: 'boolean',
          chance: {
            weighted: [
              [
                true, false,
              ],
              [1, 3],
            ],
          },
        },
        auth0_id: {
          type: 'string',
          minLength: 5,
          maxLength: 30,
          pattern: String.raw`^[\w\d]+\|[\w\d]+$`,
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
      brand_comments: {
        relation: Model.HasManyRelation,
        modelClass: `${__dirname}/brandcomments.model`,
        join: {
          from: 'Users.id',
          to: 'BrandComments.user_id',
        },
      },
      brand_reviews: {
        relation: Model.HasManyRelation,
        modelClass: `${__dirname}/brandreviews.model`,
        join: {
          from: 'Users.id',
          to: 'BrandReviews.user_id',
        },
      },
      upvotes: {
        relation: Model.HasManyRelation,
        modelClass: `${__dirname}/upvotes.model`,
        join: {
          from: 'Users.id',
          to: 'Upvotes.user_id',
        },
      },
      events: {
        relation: Model.HasManyRelation,
        modelClass: path.resolve(__dirname, 'events/', 'events.model'),
        join: {
          from: 'Users.id',
          to: 'Events.owner_id',
        },
      },
      events_attending: {
        relation: Model.HasManyRelation,
        modelClass: path.resolve(__dirname, 'events/', 'userattendees.model'),
        join: {
          from: 'Users.id',
          to: 'UserAttendees.user_id',
        },
      },
    };
  }
}

module.exports = Users;
