const webpush = require('web-push');
const Orders = require('../../db/orders.model');

webpush.setVapidDetails('mailto:test@gmail.com', process.env.VAPID_PUB, process.env.VAPID_PRIV);

module.exports = {
  put(req, res) {
    Orders.query()
      .where('id', '=', req.params.orderId)
      .patch(req.body)
      .then(() => Orders.query()
        .findById(req.params.orderId)
        .eager('[truck.brands, user.[user_push_info(first)]]', {
          first: builder => builder.first(),
        }))
      .then(({ user, truck }) => {
        res.sendStatus(200);
        const message = `Your order from ${truck.brands.name}'s ${truck.name} Truck is ready for pickup.`;
        webpush.sendNotification(JSON.parse(user.user_push_info.subscription), message);
      })
      .catch(e => console.log('Error updating truck:', e));
  },
};
