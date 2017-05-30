const MenuItems = require('../../../db/menuitems.model');

module.exports = {
  post(req, res) {
    req.body.brand_id = req.params.brandId;
    MenuItems.query()
      .insert(req.body)
      .then(item => res.status(201).send(item))
      .catch(e => res.status(400).send(e.message));
  },
  put(req, res) {
  },
  delete(req, res) {
  },
};
