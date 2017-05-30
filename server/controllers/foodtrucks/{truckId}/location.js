// const Trucks = require('../../../db/trucks.model');
const LocationTimelines = require('../../../db/locationtimelines.model');

module.exports = {
  post(req, res) {
    const now = new Date().toISOString();
    req.body.start = req.body.start ? req.body.start.toISOString() : now;
    // TODO: figure out use for checkin column, not being used ATM
    LocationTimelines.query()
      .patch({ end: now })
      .where('start', '<', now)
      .andWhere('end', 0)
      .andWhere('truck_id', parseInt(req.params.truckId, 10))
      .then(() => LocationTimelines.query().insert({
        truck_id: parseInt(req.params.truckId, 10),
        location_id: req.body.location_id,
        start: req.body.start,
      }))
      .then(lt => lt.$relatedQuery('locations')
        .eager('timelines(onlyThisInst)', {
          onlyThisInst: builder => builder.findById(lt.id),
        }))
      .then((location) => {
        res.status(201).send(location);
      })
      .catch(e => res.status(400).send(e.message));
  },
  put(req, res) {
    const id = req.body.id;
    delete req.body.id;
    req.body.end = req.body.end.toISOString();
    LocationTimelines.query()
      .findById(id)
      .patch(req.body)
      .then(() => res.sendStatus(200))
      .catch(e => res.status(400).send(e.message));
  },
};
