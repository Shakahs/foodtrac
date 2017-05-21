const User = require('../db/users.model');

module.exports = {
  post(req, res) {
    User.query()
      .insert(req.body)
      .then((result) => {
        console.log(result instanceof User);
        console.log(result);
        res.send(result);
      })
      .catch(e => console.log('Error inserting new user:', e));
  },
};
