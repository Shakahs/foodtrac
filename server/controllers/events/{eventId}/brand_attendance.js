const BrandAttendees = require('../../../db/events/brandattendees.model');

module.exports = {
  post(req, res) {
    BrandAttendees.query()
      .insert({
        event_id: req.params.eventId,
        brand_id: req.body.brandId,
      })
      .then(newFollow => res.status(201).send(newFollow))
      .catch({ code: 'ER_DUP_ENTRY' }, () => res.status(409).send('brand already attending'))
      .catch(e => res.status(400).send(e.message));
  },
};
