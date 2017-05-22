const Users = require('../../../db/users.model');

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
      // TODO: find an findOrCreate equivalent in Objection. this does not handle duplicates
      .then(user => user.$relatedQuery('user_follows').relate(req.body.id))
      .then(() => res.status(200).send(`Followed brand #${req.body.id}`))
      .catch(e => res.status(400).send(e.message));
  },
  delete(req, res) {
    console.log(req.query);
    Users.query()
      .findById(req.params.userId)
      .then(user => user.$relatedQuery('user_follows').unrelate(req.query.brand_id))
      .then(() => res.status(200).send(`Unfollowed brand #${req.query.brand_id}`))
      .catch(e => res.status(400).send(e.message));
  },
};
