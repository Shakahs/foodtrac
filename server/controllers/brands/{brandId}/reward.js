const Coupons = require('../../../db/coupons.model');
const Brands = require('../../../db/brands.model');

module.exports = {
  post(req, res) {
    Coupons.query()
      .insert(req.body.coupon)
      .then((coupon) => {
        req.body.reward.default_coupon_id = coupon.id;
        Brands.query()
          .findById(req.params.brandId)
          .patch(req.body.reward)
          .then(brand => res.status(200).send(brand))
          .catch(e => res.status(400).send(e.message));
      })
      .catch(e => res.status(400).send(e.message));
  },
};
