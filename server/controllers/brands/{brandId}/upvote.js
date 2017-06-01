const Upvote = require('../../../db/upvotes.model');

module.exports = {
  post(req, res) {
    req.body.brand_id = req.params.brandId;
    Upvote.query()
      .insert(req.body)
      .then(upvote => res.status(201).send(upvote))
      .catch(e => res.status(400).send(e.message));
  },
};
