const Events = require('../../db/events/events.model');

module.exports = {
  get(req, res) {
    Events.query()
      .findById(req.params.eventId)
      .eager('[locations, users_attending, brands_attending.brands, comments]')
      .then(event => res.status(200).send(event))
      .catch(e => res.status(400).send(e.message));
  },
};
