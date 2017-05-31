const MenuItems = require('../db/menuitems.model');

module.exports = {
  post(req, res) {
    req.body.price *= 100;
    MenuItems.query()
      .insert(req.body)
      .then(item => res.status(201).send(item))
      .catch(e => res.status(400).send(e.message));
  },
};
