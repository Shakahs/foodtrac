const BrandReviews = require('../../db/brandreviews.model');

module.exports = {
  put(req, res) {
    BrandReviews.query()
      .findById(req.params.reviewId)
      .patch(req.body)
      .then(() => BrandReviews.query().findById(req.params.reviewId))
      .then(review => res.status(200).send(review))
      .catch(e => res.status(400).send(e.message));
  },
};
