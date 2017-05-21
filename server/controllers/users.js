const Users = require('../db/users.model');

module.exports = {
  post(req, res) {
    Users.query()
      .insert(req.body)
      .then((result) => {
        console.log(result instanceof Users);
        console.log(result);
        res.send(result);
      })
      .catch(e => console.log('Error inserting new user:', e));
  },
};
