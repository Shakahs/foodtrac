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
      trucks: {
        relation: Model.ManyToManyRelation,
        modelClass: `${__dirname}/trucks.model`,
        join: {
          from: 'Locations.id',
          through: {
            from: 'LocationTimelines.location_id',
            to: 'LocationTimelines.truck_id',
          },
          to: 'Trucks.id',
        },
      },
    };
  }
}

module.exports = Locations;
