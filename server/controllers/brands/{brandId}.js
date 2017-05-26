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
    // brand, food genre, trucks with location
    const eagerOption = req.query.eager ? '[trucks.locations, food_genres]' : '';
    Brands.query()
      .eager(eagerOption)
      .findById(req.params.brandId)
      .then(brand => res.status(200).json(brand))
      .catch(e => console.log('Error fetching brand:', e));
  },
};
