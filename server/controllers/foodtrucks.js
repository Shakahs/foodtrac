const Trucks = require('../db/trucks.model');
const { getBoundingBox } = require('../utils');

module.exports = {
  get(req, res) {
    const boundingBox = getBoundingBox([req.query.lat, req.query.lng], req.query.dist || 50);
    Trucks.query()
      .eager('[brands.food_genres, locations]')
      .modifyEager(builder => builder.whereBetween('locations.lng', [boundingBox[0], boundingBox[2]]))
      .modifyEager(builder => builder.whereBetween('locations.lat', [boundingBox[1], boundingBox[3]]))
      .then(trucks => res.status(200).send(trucks))
      .catch(e => res.status(400).send(e.message));
  },
  post(req, res) {
    Trucks.query()
      .insert(req.body)
      .then(() => res.sendStatus(201))
      .catch((e) => {
        console.log('Error inserting new truck:', e);
        res.status(400).send(e.message);
      });
  },
};
