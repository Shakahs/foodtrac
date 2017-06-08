const Users = require('../db/users.model');
const { userEagerOptions } = require('./eagerOptions');
const { getLatestTruckLocation } = require('../utils');

module.exports = {
  post(req, res) {
    Users.query()
      .where('auth0_id', '=', req.body.auth0_id)
      .eager(userEagerOptions, {
        latest: builder => getLatestTruckLocation(builder),
      })
      .first()
      .then((newUser) => {
        if (newUser) {
          res.status(200).json(newUser);
        } else {
          return Users.query()
            .insert(req.body)
            .eager(userEagerOptions, {
              latest: builder => getLatestTruckLocation(builder),
            })
            .then(newUser => res.status(201).json(newUser)); // eslint-disable-line no-shadow
        }
        return true;
      })
      .catch(e => console.log('Error inserting new user:', e));
  },
};
