const BrandAttendees = require('../../../../db/events/brandattendees.model');

module.exports = {
  delete(req, res) {
    BrandAttendees.query()
      .delete()
      .where('event_id', '=', req.params.eventId)
      .where('brand_id', '=', req.params.brandId)
      .then(() => res.status(202).send('No longer attending'))
      .catch(e => res.status(400).send(e.message));
  },
};
