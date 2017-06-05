const { Model } = require('objection');
const path = require('path');

class Comments extends Model {
  static get tableName() {
    return 'Comments';
  }

  $beforeInsert() {
    this.created_at = new Date().toISOString();
  }

  $beforeUpdate() {
    this.updated_at = new Date().toISOString();
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['text', 'user_id'],

      properties: {
        id: { type: 'integer' },
        text: { type: 'string' },
        user_id: { type: 'integer' },
        brand_id: { type: 'integer' },
        event_id: { type: 'integer' },
      },
    };
  }

  static get relationMappings() {
    return {
      brands: {
        relation: Model.BelongsToOneRelation,
        modelClass: `${__dirname}/brands.model`,
        join: {
          from: 'Comments.brand_id',
          to: 'Brands.id',
        },
      },
      events: {
        relation: Model.BelongsToOneRelation,
        modelClass: path.resolve(__dirname, 'events', 'events.model'),
        join: {
          from: 'Comments.event_id',
          to: 'Events.id',
        },
      },
      users: {
        relation: Model.BelongsToOneRelation,
        modelClass: `${__dirname}/users.model`,
        join: {
          from: 'Comments.user_id',
          to: 'Users.id',
        },
      },
    };
  }
}

module.exports = Comments;
