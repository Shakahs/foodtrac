const { Model } = require('objection');
const path = require('path');

class Brands extends Model {
  static get tableName() {
    return 'Brands';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['owner_id', 'name', 'description', 'food_genre_id'],

      properties: {
        id: { type: 'integer' },
        owner_id: { type: 'integer' },
        name: {
          type: 'string',
          minLength: 1,
          maxLength: 30,
          faker: 'commerce.productName',
        },
        description: {
          type: 'string',
          minLength: 1,
          maxLength: 255,
          faker: 'company.bs',
        },
        food_genre_id: { type: 'integer' },
        rewards_trigger: {
          type: ['integer', 'null'],
          default: null,
          chance: {
            pickone: [[5, 8, 10, null]],
          },
        },
        default_coupon_id: { type: ['integer', 'null'], default: null },
      },
    };
  }

  static get relationMappings() {
    return {
      owners: {
        relation: Model.BelongsToOneRelation,
        modelClass: `${__dirname}/users.model`,
        join: {
          from: 'Brands.owner_id',
          to: 'Users.id',
        },
      },
      food_genres: {
        relation: Model.BelongsToOneRelation,
        modelClass: `${__dirname}/foodgenres.model`,
        join: {
          from: 'Brands.food_genre_id',
          to: 'FoodGenres.id',
        },
      },
      user_follows: {
        relation: Model.ManyToManyRelation,
        modelClass: `${__dirname}/users.model`,
        join: {
          from: 'Brands.id',
          through: {
            from: 'UserFollows.brand_id',
            to: 'UserFollows.user_id',
          },
          to: 'Users.id',
        },
      },
      trucks: {
        relation: Model.HasManyRelation,
        modelClass: `${__dirname}/trucks.model`,
        join: {
          from: 'Brands.id',
          to: 'Trucks.brand_id',
        },
      },
      menu_items: {
        relation: Model.HasManyRelation,
        modelClass: `${__dirname}/menuitems.model`,
        join: {
          from: 'Brands.id',
          to: 'MenuItems.brand_id',
        },
      },
      brand_comments: {
        relation: Model.HasManyRelation,
        modelClass: `${__dirname}/comments.model`,
        join: {
          from: 'Brands.id',
          to: 'Comments.brand_id',
        },
      },
      brand_reviews: {
        relation: Model.HasManyRelation,
        modelClass: `${__dirname}/brandreviews.model`,
        join: {
          from: 'Brands.id',
          to: 'BrandReviews.brand_id',
        },
      },
      upvotes: {
        relation: Model.HasManyRelation,
        modelClass: `${__dirname}/upvotes.model`,
        join: {
          from: 'Brands.id',
          to: 'Upvotes.brand_id',
        },
      },
      events_attending: {
        relation: Model.HasManyRelation,
        modelClass: path.resolve(__dirname, 'events/', 'brandattendees.model'),
        join: {
          from: 'Brands.id',
          to: 'BrandAttendees.brand_id',
        },
      },
      coupon: {
        relation: Model.BelongsToOneRelation,
        modelClass: `${__dirname}/coupons.model`,
        join: {
          from: 'Brands.default_coupon_id',
          to: 'Coupons.id',
        },
      },
    };
  }
}

module.exports = Brands;
