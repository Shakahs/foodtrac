const { Model } = require('objection');

class Upvotes extends Model {
  static get tableName() {
    return 'Upvotes';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['user_id', 'brand_id', 'date'],

      properties: {
        id: { type: 'integer' },
        user_id: { type: 'integer' },
        brand_id: { type: 'integer' },
        date: { type: 'string' },
        timeline_id: { type: 'integer' },
      },
    };
  }

  static get relationMappings() {
    return {
      brands: {
        relation: Model.BelongsToOneRelation,
        modelClass: `${__dirname}/brands.model`,
        join: {
          from: 'Upvotes.brand_id',
          to: 'Brands.id',
        },
      },
      users: {
        relation: Model.BelongsToOneRelation,
        modelClass: `${__dirname}/users.model`,
        join: {
          from: 'Upvotes.user_id',
          to: 'Users.id',
        },
      },
      location_timelines: {
        relation: Model.BelongsToOneRelation,
        modelClass: `${__dirname}/locationtimelines.model`,
        join: {
          from: 'Upvotes.timeline_id',
          to: 'LocationTimelines.id',
        },
      },
    };
  }
}

module.exports = Upvotes;
