const { Model } = require('objection');

class LocationTimelines extends Model {
  static get tableName() {
    return 'LocationTimelines';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['start', 'truck_id', 'location_id'],

      properties: {
        id: { type: 'integer' },
        start: { type: 'string' },
        end: { type: 'string' },
        truck_id: { type: 'integer' },
        location_id: { type: 'integer' },
        checked_in: { type: 'boolean', default: false },
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
      upvotes: {
        relation: Model.HasManyRelation,
        modelClass: `${__dirname}/upvotes.model`,
        join: {
          from: 'LocationTimelines.id',
          to: 'Upvotes.timeline_id',
        },
      },
    };
  }
}

module.exports = LocationTimelines;
