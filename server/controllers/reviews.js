const BrandReviews = require('../../server/db/brandreviews.model');

module.exports = {
  post(req, res) {
    BrandReviews.query()
      .insert(req.body)
      .then(review => res.status(201).send(review))
      .catch(e => res.status(400).send(e.message));
  },
};
