const BrandComments = require('../../server/db/brandcomments.model');

module.exports = {
  post(req, res) {
    BrandComments.query()
      .insert(req.body)
      .then(comment => res.status(201).send(comment))
      .catch(e => res.status(400).send(e.message));
  },
};
