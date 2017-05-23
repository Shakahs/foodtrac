const { Model } = require('objection');

class LocationTimelines extends Model {
  static get tableName() {
    return 'LocationTimelines';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['start', 'truck_id', 'location_id', 'checked_in'],

      properties: {
        id: { type: 'integer' },
        start: { type: 'integer' },
        end: { type: 'integer' },
        truck_id: { type: 'integer' },
        location_id: { type: 'integer' },
        checked_in: { type: 'boolean', default: 'false' },
      },
    };
  }

  static get relationMappings() {
    return {
      locations: {
        relation: Model.BelongsToOneRelation,
        modelClass: `${__dirname}/locations.model`,
        join: {
          from: 'LocationTimelines.location_id',
          to: 'Locations.id',
        },
      },
      trucks: {
        relation: Model.BelongsToOneRelation,
        modelClass: `${__dirname}/trucks.model`,
        join: {
          from: 'LocationTimelines.truck_id',
          to: 'Trucks.id',
        },
      },
    };
  }
}

module.exports = LocationTimelines;
