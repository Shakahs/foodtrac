const { Model } = require('objection');

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
        name: {
          type: ['string', 'null'],
          default: null,
          maxLength: 20,
          chance: {
            weighted: [
              [
                'Hank', 'Bobby', 'Dale', 'Boomhauer', 'null',
              ],
              [1, 1, 1, 1, 8],
            ],
          },
        },
        brand_id: { type: 'integer' },
      },
    };
  }

  static get relationMappings() {
    return {
      brands: {
        relation: Model.BelongsToOneRelation,
        modelClass: `${__dirname}/brands.model`,
        join: {
          from: 'Trucks.brand_id',
          to: 'Brands.id',
        },
      },
      locations: {
        relation: Model.ManyToManyRelation,
        modelClass: `${__dirname}/locations.model`,
        join: {
          from: 'Trucks.id',
          through: {
            from: 'LocationTimelines.truck_id',
            to: 'LocationTimelines.location_id',
            extra: {
              start: 'start',
              end: 'end',
              timeline_id: 'id',
            },
          },
          to: 'Locations.id',
        },
      },
      timelines: {
        relation: Model.HasManyRelation,
        modelClass: `${__dirname}/locationtimelines.model`,
        join: {
          from: 'Trucks.id',
          to: 'LocationTimelines.truck_id',
        },
      },
    };
  }
}

module.exports = Trucks;
