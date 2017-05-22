const Brands = require('../../db/brands.model');

module.exports = {
  put(req, res) {
    Brands.query()
      .where('id', '=', req.params.brandId)
      .update(req.body)
      .then(brand => res.status(200).json(brand))
      .catch(e => console.log('Error updating brand:', e));
  },
  get(req, res) {
    Brands.query()
      .where('id', '=', req.params.brandId)
      .then(brand => res.status(200).json(brand))
      .catch(e => console.log('Error fetching brand:', e));
  },
};
