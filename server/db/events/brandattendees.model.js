const { Model } = require('objection');
const path = require('path');

class BrandAttendees extends Model {
  static get tableName() {
    return 'BrandAttendees';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['text', 'user_id', 'brand_id'],

      properties: {
        id: { type: 'integer' },
        event_id: { type: 'integer' },
        brand_id: { type: 'integer' },
      },
    };
  }

  static get relationMappings() {
    return {
      events: {
        relation: Model.BelongsToOneRelation,
        modelClass: `${__dirname}/events.model`,
        join: {
          from: 'UserAttendees.event_id',
          to: 'Events.id',
        },
      },
      brands: {
        relation: Model.BelongsToOneRelation,
        modelClass: path.resolve(__dirname, '../', 'brands.model'),
        join: {
          from: 'UserAttendees.user_id',
          to: 'Brands.id',
        },
      },
    };
  }
}

module.exports = BrandAttendees;
