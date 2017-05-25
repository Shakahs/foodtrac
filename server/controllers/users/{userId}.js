const Users = require('../../db/users.model');

module.exports = {
  get(req, res) {
    Users.query()
      .findById(req.params.userId)
      .eager('brands')
      .then((user) => {
        user.is_truck_owner = Boolean(user.is_truck_owner); // eslint-disable-line no-param-reassign
        res.status(200).json(user);
      })
      .catch(e => console.log('Error inserting new user:', e));
  },
  put(req, res) {
    Users.query()
      .findById(req.params.userId)
      .patch(req.body)
      .then(user => res.status(200).json(user))
      .catch(e => console.log('Error updating user:', e));
  },
  delete(req, res) {
    Users.query()
      .findById(req.params.userId)
      .delete()
      .then(() => res.status(200))
      .catch(e => console.log('Error deleting user:', e));
  },
};
