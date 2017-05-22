const Users = require('../db/users.model');

module.exports = {
  post(req, res) {
    Users.query()
      .insert(req.body)
      .then(() => res.sendStatus(201))
      .catch(e => console.log('Error inserting new user:', e));
  },
};
