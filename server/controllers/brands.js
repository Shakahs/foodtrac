const Brands = require('../db/brands.model');

module.exports = {
  post(req, res) {
    Brands.query()
      .insert(req.body)
      .then(() => res.sendStatus(201))
      .catch(e => console.log('Error creating new brand:', e));
  },

};

// {
//   "owner_id": 5,
//   "name": "Durrhurr",
//   "description": "blah blah",
// }
