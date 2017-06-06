const { notifyFollowers } = require('../../../utils');
const BrandAttendees = require('../../../db/events/brandattendees.model');
const Events = require('../../../db/events/events.model');

module.exports = {
  post(req, res) {
    let newBrandAttendee;
    BrandAttendees.query()
      .insert({
        event_id: req.params.eventId,
        brand_id: req.body.brandId,
      })
      .then((attendee) => {
        newBrandAttendee = attendee;
        return Events.query()
          .findById(req.params.eventId)
          .eager('brands_attending(first).[brands(first).[user_follows.[user_push_info(first)]]]', {
            first: builder => builder.first(),
          });
      })
      .then((event) => {
        const { brands } = event.brands_attending[0];
        const message = `${brands.name} is attending ${event.name} on ${event.start}!`;
        return notifyFollowers(brands, message);
      })
      .then(() => res.status(201).send(newBrandAttendee))
      .catch({ code: 'ER_DUP_ENTRY' }, () => { res.status(409).send('brand already attending'); })
      .catch((e) => { res.status(400).send(e.message); });
  },
};
