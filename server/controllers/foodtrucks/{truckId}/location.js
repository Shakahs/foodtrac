const { notifyFollowers } = require('../../../utils');
const Trucks = require('../../../db/trucks.model');
const LocationTimelines = require('../../../db/locationtimelines.model');

const pushNotifications = (res, truckId, location) => Trucks.query()
    .findById(truckId)
    .eager('brands.[user_follows.user_push_info(first)]', {
      first: builder => builder.first(),
    })
    .then((truck) => {
      const message = location
        ? `${truck.brands.name}'s ${truck.name} Truck has moved to ${location.address}`
        : `${truck.brands.name}'s ${truck.name} Truck is no longer active on the map.`;
      return notifyFollowers(truck.brands, message);
    })
    .then(() => {
      if (location) {
        res.status(201).send(location);
      } else {
        res.status(200).send('Ended current location.');
      }
    })
    .catch(e => res.status(400).send(e.message));

module.exports = {
  post(req, res) {
    const now = new Date().toISOString();
    const truckId = parseInt(req.params.truckId, 10);
    req.body.start = req.body.start ? req.body.start.toISOString() : now;
    // TODO: figure out use for checkin column, not being used ATM
    LocationTimelines.query()
      .patch({ end: now })
      .where('start', '<', now)
      .andWhere('end', 0)
      .andWhere('truck_id', truckId)
      .then(() => LocationTimelines.query().insert({
        truck_id: truckId,
        location_id: req.body.location_id,
        start: req.body.start,
      }))
      .then(lt => lt.$relatedQuery('locations')
        .eager('timelines(onlyThisInst)', {
          onlyThisInst: builder => builder.findById(lt.id),
        }))
      .then(location => pushNotifications(res, truckId, location))
      .catch(e => res.status(400).send(e.message));
  },
  put(req, res) {
    const id = req.body.id;
    delete req.body.id;
    req.body.end = req.body.end.toISOString();
    LocationTimelines.query()
      .findById(id)
      .patch(req.body)
      .then(() => pushNotifications(res, req.params.truckId))
      .catch(e => res.status(400).send(e.message));
  },
};
