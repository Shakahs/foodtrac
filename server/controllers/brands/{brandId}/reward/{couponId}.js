const Coupons = require('../../../../db/coupons.model');
const Brands = require('../../../../db/brands.model');

module.exports = {
  put(req, res) {
    Coupons.query()
      .findById(req.params.couponId)
      .patch(req.body.coupon)
      .then(() =>
        Brands.query()
          .findById(req.params.brandId)
          .patch(req.body.reward) // eslint-disable-line comma-dangle
      )
      .then(() => res.sendStatus(200))
      .catch(e => res.sendStatus(400).send(e.message));
  },
};
