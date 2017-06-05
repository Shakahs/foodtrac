const BrandComments = require('../../db/comments.model');

module.exports = {
  put(req, res) {
    BrandComments.query()
      .findById(req.params.commentId)
      .patch(req.body)
      .then(() => BrandComments.query().findById(req.params.commentId).eager('users'))
      .then(comment => res.status(200).send(comment))
      .catch(e => res.status(400).send(e.message));
  },
  delete(req, res) {
    BrandComments.query()
      .deleteById(req.params.commentId)
      .then(() => res.sendStatus(200))
      .catch(e => res.status(400).send(e.message));
  },
};
