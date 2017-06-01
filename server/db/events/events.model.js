const { Model } = require('objection');
const path = require('path');

class Events extends Model {
  static get tableName() {
    return 'Events';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['start', 'end', 'name', 'description', 'location_id', 'owner_id'],

      properties: {
        id: { type: 'integer' },
        start: { type: 'string' },
        end: { type: 'string' },
        name: { type: 'string' },
        description: { type: 'string' },
        location_id: { type: 'integer' },
        owner_id: { type: 'integer' },
      },
    };
  }

  static get relationMappings() {
    return {
      owners: {
        relation: Model.BelongsToOneRelation,
        modelClass: path.resolve(__dirname, '../', 'users.model'),
        join: {
          from: 'Events.owner_id',
          to: 'Users.id',
        },
      },
      locations: {
        relation: Model.BelongsToOneRelation,
        modelClass: path.resolve(__dirname, '../', 'locations.model'),
        join: {
          from: 'Events.location_id',
          to: 'Locations.id',
        },
      },
    };
  }
}

module.exports = Events;
