const Users = require('../../../db/users.model');
const { getLatestTruckLocation, getFirstOrNullLocation } = require('../../../utils');

module.exports = {
  get(req, res) {
    Users.query()
      .findById(req.params.userId)
      .then(user => user.$relatedQuery('user_follows'))
      .then(followedBrands => res.status(200).json(followedBrands))
      .catch(e => res.status(400).send(e.message));
  },
  post(req, res) {
    Users.query()
      .findById(req.params.userId)
      .then(user => user.$relatedQuery('user_follows').relate(req.body.id))
      .then(() => Users.query().findById(req.params.userId))
      .then(user => user.$relatedQuery('user_follows').findById(req.body.id).eager('[food_genres, upvotes, trucks.[locations(latest)]]', {
        latest: builder => getLatestTruckLocation(builder),
      }))
      .then((newFollow) => {
        getFirstOrNullLocation(newFollow);
        res.status(201).send(newFollow);
      })
      .catch(e => res.status(400).send(e.message));
  },
  delete(req, res) {
    Users.query()
      .findById(req.params.userId)
      .then(user => user.$relatedQuery('user_follows').unrelate().where('id', req.query.brand_id))
      .then(() => res.status(202).send(`Unfollowed brand #${req.query.brand_id}`))
      .catch(e => res.status(400).send(e.message));
  },
};
