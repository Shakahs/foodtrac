const { Model } = require('objection');
const path = require('path');

class UserAttendees extends Model {
  static get tableName() {
    return 'UserAttendees';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['text', 'user_id', 'brand_id'],

      properties: {
        id: { type: 'integer' },
        event_id: { type: 'integer' },
        user_id: { type: 'integer' },
      },
    };
  }

  static get relationMappings() {
    return {
      events: {
        relation: Model.BelongsToOneRelation,
        modelClass: `${__dirname}/events.model`,
        join: {
          from: 'UserAttendees.event_id',
          to: 'Events.id',
        },
      },
      users: {
        relation: Model.BelongsToOneRelation,
        modelClass: path.resolve(__dirname, '../', 'users.model'),
        join: {
          from: 'UserAttendees.user_id',
          to: 'Users.id',
        },
      },
    };
  }
}

module.exports = UserAttendees;
