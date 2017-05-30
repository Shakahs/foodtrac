const BrandComments = require('../../db/brandcomments.model');

module.exports = {
  put(req, res) {
    BrandComments.query()
      .findById(req.params.commentId)
      .patch(req.body)
      .then(() => BrandComments.query().findById(req.params.commentId))
      .then(comment => res.status(200).send(comment))
      .catch(e => res.status(400).send(e.message));
  },
};
