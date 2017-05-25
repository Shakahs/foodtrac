const Users = require('../../db/users.model');

module.exports = {
  get(req, res) {
    Users.query()
      .where('id', '=', req.params.userId)
      .then((user) => {
        const thisUser = user[0];
        thisUser.is_truck_owner = Boolean(thisUser.is_truck_owner);
        res.status(200).json(thisUser);
      })
      .catch(e => console.log('Error inserting new user:', e));
  },
  put(req, res) {
    Users.query()
      .where('id', '=', req.params.userId)
      .patch(req.body)
      .then(user => res.status(200).json(user))
      .catch(e => console.log('Error updating user:', e));
  },
  delete(req, res) {
    Users.query()
      .where('id', '=', req.params.userId)
      .delete()
      .then(() => res.status(200))
      .catch(e => console.log('Error deleting user:', e));
  },
};
