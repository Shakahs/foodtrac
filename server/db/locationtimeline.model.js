const { Model } = require('objection');
const Locations = require('./locations.model');
const Trucks = require('./trucks.model');

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
        modelClass: Locations,
        join: {
          from: 'LocationTimeline.location_id',
          to: 'Locations.id',
        },
      },
      trucks: {
        relation: Model.BelongsToOneRelation,
        modelClass: Trucks,
        join: {
          from: 'LocationTimeline.truck_id',
          to: 'Trucks.id',
        },
      },
    };
  }
}

module.exports = LocationTimeline;
