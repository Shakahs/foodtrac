const Users = require('../db/users.model');

module.exports = {
  post(req, res) {
    Users.query()
      .insert(req.body)
      .then(newUser => res.status(201).json(newUser))
      .catch(e => console.log('Error inserting new user:', e));
  },
};
