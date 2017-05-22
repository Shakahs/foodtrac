const Brands = require('../../../db/brands.model');

module.exports = {
  get(req, res) {
    Brands.query()
      .findById(req.params.brandId)
      .then(brand => brand.$relatedQuery('trucks'))
      .then(trucks => res.status(200).json(trucks))
      .catch(e => res.status(400).send(e.message));
  },
};
