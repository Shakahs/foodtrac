const Users = require('../db/users.model');
const { userEagerOptions } = require('./eagerOptions');

module.exports = {
  post(req, res) {
    Users.query()
      .where('auth0_id', '=', req.body.auth0_id)
      .eager(userEagerOptions)
      // .eager('[brands, user_rewards.[user_coupons.coupons]]')
      .first()
      .then((newUser) => {
        if (newUser) {
          res.status(200).json(newUser);
        } else {
          return Users.query()
            .insert(req.body)
            .eager(userEagerOptions)
            .then(newUser => res.status(201).json(newUser)); // eslint-disable-line no-shadow
        }
        return true;
      })
      .catch(e => console.log('Error inserting new user:', e));
  },
};
