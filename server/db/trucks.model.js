const { Model } = require('objection');
const Brands = require('./brands.model');
const LocationTimeline = require('./locationtimeline.model');

class Trucks extends Model {
  static get tableName() {
    return 'Trucks';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['name', 'brand_id'],

      properties: {
        id: { type: 'integer' },
        name: { type: 'string', minLength: 1, maxLength: 20 },
        brand_id: { type: 'integer' },
      },
    };
  }

  static get relationMappings() {
    return {
      brands: {
        relation: Model.BelongsToOneRelation,
        modelClass: Brands,
        join: {
          from: 'Trucks.brand_id',
          to: 'Brands.id',
        },
      },
      location_timeline: {
        relation: Model.HasManyRelation,
        modelClass: LocationTimeline,
        join: {
          from: 'Trucks.id',
          to: 'LocationTimeline.location_id',
        },
      },
    };
  }
}

module.exports = Trucks;
