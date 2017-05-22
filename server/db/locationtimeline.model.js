const { Model } = require('objection');

class LocationTimeline extends Model {
  static get tableName() {
    return 'LocationTimeline';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['start', 'truck_id', 'location_id', 'checked_in'],

      properties: {
        id: { type: 'integer' },
        start: { type: 'string' },
        end: { type: 'string' },
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
          from: 'LocationTimeline.location_id',
          to: 'Locations.id',
        },
      },
      trucks: {
        relation: Model.BelongsToOneRelation,
        modelClass: `${__dirname}/trucks.model`,
        join: {
          from: 'LocationTimeline.truck_id',
          to: 'Trucks.id',
        },
      },
    };
  }
}

module.exports = LocationTimeline;
