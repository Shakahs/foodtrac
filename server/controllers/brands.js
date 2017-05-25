const Brands = require('../db/brands.model');

module.exports = {
  post(req, res) {
    Brands.query()
      .insertGraph(req.body)
      .then(newBrand => res.status(201).send(newBrand))
      .catch(e => console.log('Error creating new brand:', e));
  },
};
