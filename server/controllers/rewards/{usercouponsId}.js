const UserCoupons = require('../../db/usercoupons.model');

module.exports = {
  put(req, res) {
    UserCoupons.query()
      .findById(req.params.usercouponsId)
      .patch(req.body)
      .then(() => res.sendStatus(200))
      .catch(e => res.status(400).send(e.message));
  },
};
