const Trucks = require('../../db/trucks.model');

module.exports = {
  get(req, res) {
    Trucks.query()
      .findById(req.params.truckId)
      .eager('brands.[food_genres, upvotes, menu_items, coupon]')
      .then(truck => res.status(200).json(truck))
      .catch((e) => {
        console.log('Error fetching truck info:', e);
        res.sendStatus(400);
      });
  },
  put(req, res) {
    Trucks.query()
      .findById(req.params.truckId)
      .patch(req.body)
      .then(truck => res.status(200).json(truck))
      .catch((e) => {
        console.log('Error updating truck info:', e);
        res.sendStatus(400);
      });
  },
  delete(req, res) {
    Trucks.query()
      .findById(req.params.truckId)
      .delete()
      .then(() => res.status(200))
      .catch((e) => {
        console.log('Error deleting truck:', e);
        res.sendStatus(400);
      });
  },
};
