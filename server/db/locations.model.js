const { Model } = require('objection');

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
        name: { type: 'string', minLength: 1, maxLength: 30 },
        address: { type: 'string', minLength: 1, maxLength: 100 },
        lat: { type: 'number' },
        lng: { type: 'number' },
      },
    };
  }

  static get relationMappings() {
    return {
      location_timeline: {
        relation: Model.HasManyRelation,
        modelClass: `${__dirname}/locationtimeline.model`,
        join: {
          from: 'Locations.id',
          to: 'LocationTimeline.location_id',
        },
      },
    };
  }
}

module.exports = Locations;
