const _ = require('lodash');
const Brands = require('../../db/brands.model');

module.exports = {
  put(req, res) {
    Brands.query()
      .findById(req.params.brandId)
      .patch(req.body)
      .then(brand => res.status(200).json(brand))
      .catch(e => console.log('Error updating brand:', e));
  },
  get(req, res) {
    // users need a username to display publically
    const eagerOption = req.query.eager
      ? '[trucks.locations, food_genres, menu_items, brand_comments(newestFirst).users.[brand_reviews, brands], brand_reviews(newestFirst).users, upvotes, events_attending.events, coupon]'
      : '';
    const currentTime = new Date();
    const latestValidTime = new Date(currentTime - 28800000);
    Brands.query()
      .findById(req.params.brandId)
      .eagerAlgorithm(Brands.WhereInEagerAlgorithm)
      .eager(eagerOption, {
        newestFirst: builder => builder.orderBy('created_at', 'desc'),
      })
      .modifyEager('trucks.locations', (builder) => {
        builder
          .andWhereBetween('start', [latestValidTime.toISOString(), currentTime.toISOString()])
          .andWhere('end', 0)
          .orWhere('end', '>', currentTime.toISOString())
          .orderBy('start', 'desc');
      })
      .then((brand) => { /* eslint-disable no-param-reassign */
        _.forEach(brand.trucks, (truck) => {
          if (truck.locations.length > 0) {
            truck.locations = truck.locations[0];
          } else {
            truck.locations = null;
          }
        });
        brand.menu_items = _.map(brand.menu_items, (item) => {
          item.price /= 100;
          return item;
        });
        res.status(200).json(brand);
      })
      .catch(e => console.log('Error fetching brand:', e));
  },
};
