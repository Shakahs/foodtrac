const Events = require('../db/events/events.model');
// const { getBoundingBox } = require('../utils');

module.exports = {
  // get(req, res) {
  //   Events.query()
  //   .then(data => res.status(200).send(data))
  //   .catch(e => console.log('Error getting events:', e));
  // },
  post(req, res) {
    Events.query()
      .insert(req.body)
      .then(newEvent => res.status(201).send(newEvent))
      .catch(e => console.log('Error creating new event:', e));
  },
};
