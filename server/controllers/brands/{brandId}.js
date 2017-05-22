const Brands = require('../../db/brands.model');

module.exports = {
  put(req, res) {
    Brands.query()
      .where('id', '=', req.params.brandId)
      .update(req.body)
      .then(() => res.sendStatus(200))
      .catch(e => console.log('Error updating brand:', e));
  },
  get(req, res) {
    Brands.query()
      .where('id', '=', req.params.brandId)
      .then(result => res.send(result))
      .catch(e => console.log('Error fetching brand:', e));
  },
};
