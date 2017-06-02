const MenuItems = require('../../db/menuitems.model');

module.exports = {
  put(req, res) {
    if (req.body.price < 100) {
      req.body.price = Math.round(req.body.price * 100);
    }
    MenuItems.query()
      .findById(req.params.menuItemId)
      .patch(req.body)
      .then(() => MenuItems.query().findById(req.params.menuItemId))
      .then(item => res.status(200).send(item))
      .catch(e => res.status(400).send(e.message));
  },
  delete(req, res) {
    MenuItems.query()
      .deleteById(req.params.menuItemId)
      .then(() => res.sendStatus(200))
      .catch(e => res.status(400).send(e.message));
  },
};
