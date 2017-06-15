const { Model } = require('objection');
const path = require('path');

class Locations extends Model {
  static get tableName() {
    return 'Locations';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['name', 'address', 'lat', 'lng'],

      properties: {
        id: { type: 'integer' },
        name: { type: 'string', minLength: 1, maxLength: 255 },
        address: { type: 'string', minLength: 1, maxLength: 100 },
        lat: { type: 'number' },
        lng: { type: 'number' },
      },
    };
  }

  static get relationMappings() {
    return {
      trucks: {
        relation: Model.ManyToManyRelation,
        modelClass: `${__dirname}/trucks.model`,
        join: {
          from: 'Locations.id',
          through: {
            from: 'LocationTimelines.location_id',
            to: 'LocationTimelines.truck_id',
            extra: {
              start: 'start',
              end: 'end',
              timeline_id: 'id',
            },
          },
          to: 'Trucks.id',
        },
      },
      timelines: {
        relation: Model.HasManyRelation,
        modelClass: `${__dirname}/locationtimelines.model`,
        join: {
          from: 'Locations.id',
          to: 'LocationTimelines.location_id',
        },
      },
      events: {
        relation: Model.HasManyRelation,
        modelClass: path.resolve(__dirname, 'events/', 'events.model'),
        join: {
          from: 'Locations.id',
          to: 'Events.location_id',
        },
      },
    };
  }
}

module.exports = Locations;
