const UserAttendees = require('../../../../db/events/userattendees.model');

module.exports = {
  delete(req, res) {
    UserAttendees.query()
      .delete()
      .where('event_id', '=', req.params.eventId)
      .where('user_id', '=', req.params.userId)
      .then(() => res.status(202).send('No longer attending'))
      .catch(e => res.status(400).send(e.message));
  },
};
