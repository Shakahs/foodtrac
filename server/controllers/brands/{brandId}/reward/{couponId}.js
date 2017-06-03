const Coupons = require('../../../../db/coupons.model');
const Brands = require('../../../../db/brands.model');

module.exports = {
  put(req, res) {
    Coupons.query()
      .findById(req.params.couponId)
      .patch(req.body.coupon)
      .then(() => {
        Brands.query()
          .findById(req.params.brandId)
          .patch(req.body.reward)
          .then(brand => res.sendStatus(200).send(brand))
          .catch(e => res.sendStatus(400).send(e.message));
      })
      .catch(e => res.sendStatus(400).send(e.message));
  },
};
