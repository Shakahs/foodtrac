const UserCoupons = require('../../db/usercoupons.model');

module.exports = {
  post(req, res) {
    UserCoupons.query()
      .insert(req.body)
      .then(data => res.status(200).send(data))
      .catch(e => res.status(400).send(e.message));
  },
};
