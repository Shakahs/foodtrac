const Trucks = require('../../../db/trucks.model');

module.exports = {
  post(req, res) {
    req.body.start = req.body.start ? req.body.start.toISOString() : new Date();
    Trucks.query()
      .findById(req.params.truckId)
      .then(truck => truck.$relatedQuery('locations').relate({
        id: req.body.location_id,
        start: req.body.start,
      }))
      .then(() => res.send(`Inserted new location timeline entry for truck #${req.params.truckId}`))
      .catch(e => res.status(400).send(e.message));
  },
  put(req, res) {
    res.send('putput');
  },
};
