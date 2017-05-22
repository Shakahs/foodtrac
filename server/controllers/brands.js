const Brands = require('../db/brands.model');

module.exports = {
  post(req, res) {
    Brands.query()
      .insert(req.body)
      .then(newBrand => res.status(201).json(newBrand))
      .catch(e => console.log('Error creating new brand:', e));
  },

};
