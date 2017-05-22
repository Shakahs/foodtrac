const Locations = require('../db/locations.model');
const { getBoundingBox } = require('../utils');

module.exports = {
  post(req, res) {
    Locations.query()
      .insert(req.body)
      .then(() => res.sendStatus(201))
      .catch((e) => {
        console.log('Error inserting new location:', e);
        res.status(400).send(e.message);
      });
  },
  get(req, res) {
    const boundingBox = getBoundingBox([req.query.lat, req.query.lng], req.query.dist || 50);
    Locations.query()
      .whereBetween('lng', [boundingBox[0], boundingBox[2]])
      .andWhereBetween('lat', [boundingBox[1], boundingBox[3]])
      .then(locations => res.status(200).send(locations))
      .catch(e => res.status(400).send(e.message));
  },
};
