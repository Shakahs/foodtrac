const Locations = require('../../db/locations.model');

module.exports = {
  get(req, res) {
    Locations.query()
      .where('id', '=', req.params.locationId)
      .then(result => res.send(result))
      .catch((e) => {
        console.log('Error fetching location:', e);
        res.sendStatus(400);
      });
  },
};
