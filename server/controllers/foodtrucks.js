const _ = require('lodash');
const Trucks = require('../db/trucks.model');
const { getBoundingBox } = require('../utils');

module.exports = {
  get(req, res) {
    const boundingBox = getBoundingBox([req.query.lat, req.query.lng], req.query.dist || 50);
    const currentTime = new Date();
    const latestValidTime = new Date(currentTime - 28800000);
    Trucks.query()
    // TODO: modify to only get trucks with valid location time
      .eagerAlgorithm(Trucks.WhereInEagerAlgorithm)
      .eager('[brands.food_genres, locations]')
      .modifyEager('locations', (builder) => {
        builder
          .whereBetween('lng', [boundingBox[0], boundingBox[2]])
          .andWhereBetween('lat', [boundingBox[1], boundingBox[3]])
          .andWhereBetween('start', [latestValidTime.toISOString(), currentTime.toISOString()])
          .andWhere('end', 0)
          .orWhere('end', '>', currentTime.toISOString())
          .orderBy('start', 'desc');
      })
      .then((trucks) => {
        _.forEach(trucks, (truck) => {
          if (truck.locations.length > 0) {
            truck.locations = truck.locations[0]; // eslint-disable-line no-param-reassign
          } else {
            truck.locations = null; // eslint-disable-line no-param-reassign
          }
        });
        res.status(200).send(trucks);
      })
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
