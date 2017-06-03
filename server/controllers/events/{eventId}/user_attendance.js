const UserAttendees = require('../../../db/events/userattendees.model');

module.exports = {
  post(req, res) {
    UserAttendees.query()
      .insert({
        event_id: req.params.eventId,
        user_id: req.body.userId,
      })
      .then(newFollow => res.status(201).send(newFollow))
      .catch({ code: 'ER_DUP_ENTRY' }, () => res.status(409).send('user already attending'))
      .catch(e => res.status(400).send(e.message));
  },
  delete(req, res) {
    UserAttendees.query()
      .delete()
      .where('event_id', '=', req.params.eventId)
      .where('user_id', '=', req.body.userId)
      .then(() => res.status(202).send('No longer attending'))
      .catch(e => res.status(400).send(e.message));
  },
};
