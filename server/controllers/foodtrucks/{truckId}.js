const Trucks = require('../../db/trucks.model');

module.exports = {
  get(req, res) {
    Trucks.query()
      .where('id', '=', req.params.truckId)
      .then(result => res.send(result))
      .catch((e) => {
        console.log('Error fetching truck info:', e);
        res.sendStatus(400);
      });
  },
  put(req, res) {
    Trucks.query()
      .update(req.body)
      .then(() => res.sendStatus(200))
      .catch((e) => {
        console.log('Error updating truck info:', e);
        res.sendStatus(400);
      });
  },
  delete(req, res) {
    Trucks.query()
      .where('id', '=', req.params.truckId)
      .delete()
      .then(() => res.sendStatus(200))
      .catch((e) => {
        console.log('Error deleting truck:', e);
        res.sendStatus(400);
      });
  },
};
