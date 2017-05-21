const User = require('../../db/users.model');

module.exports = {
  get(req, res) {
    User.query()
      .where('id', '=', req.params.userId)
      .then((result) => {
        console.log(result instanceof User);
        console.log(result);
        res.send(result);
      })
      .catch(e => console.log('Error inserting new user:', e));
  },
  put(req, res) {
    User.query()
      .where('id', '=', req.params.userId)
      .patch(req.body)
      .then(() => res.sendStatus(200))
      .catch(e => console.log('Error updating user:', e));
  },
  delete(req, res) {
    User.query()
      .where('id', '=', req.params.userId)
      .delete()
      .then(() => res.sendStatus(200))
      .catch(e => console.log('Error deleting user:', e));
  },
};
