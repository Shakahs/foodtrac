// const Trucks = require('../../../db/trucks.model');
const LocationTimelines = require('../../../db/locationtimelines.model');

module.exports = {
  post(req, res) {
    req.body.start = req.body.start ? req.body.start.toISOString() : new Date();
    // Trucks.query()
    //   .findById(req.params.truckId)
    //   .then(truck => truck.$relatedQuery('locations').relate({
    //     id: req.body.location_id,
    //     start: req.body.start,
    //   }))
    LocationTimelines.query()
      .insert({
        truck_id: parseInt(req.params.truckId, 10),
        location_id: req.body.location_id,
        start: req.body.start,
      })
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
    LocationTimelines.query()
      .patch(req.body)
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
    res.send('putput');
  },
};
