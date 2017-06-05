const Events = require('../../db/events/events.model');

module.exports = {
  get(req, res) {
    Events.query()
      .findById(req.params.eventId)
      // eslint-disable-next-line quotes, no-useless-escape
      .eager(`[locations, \
      users_attending.users.[brands, brand_reviews], \
      brands_attending.brands, \
      comments(newestFirst).users.[brand_reviews, \
      brands]]`, {
        newestFirst: builder => builder.orderBy('created_at', 'desc'),
      })
      .then(event => res.status(200).send(event))
      .catch(e => res.status(400).send(e.message));
  },
};
