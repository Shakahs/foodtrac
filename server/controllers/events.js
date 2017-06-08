const Events = require('../db/events/events.model');
// const { getBoundingBox } = require('../utils');

module.exports = {
  get(req, res) {
    Events.query()
      .eager('[locations, owners, users_attending.users, brands_attending.brands.logo_image]')
      .then(data => res.status(200).send(data))
      .catch(e => console.log('Error getting events:', e));
  },
  post(req, res) {
    return Events.query()
      .insertGraph(req.body)
      .then(newEvent => res.status(201).send(newEvent))
      .catch(e => console.log('Error creating new event:', e));
  },
};
