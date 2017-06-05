const BrandComments = require('../db/comments.model');

module.exports = {
  post(req, res) {
    BrandComments.query()
      .insert(req.body)
      .eager('users')
      .then(comment => res.status(201).send(comment))
      .catch(e => res.status(400).send(e.message));
  },
};
