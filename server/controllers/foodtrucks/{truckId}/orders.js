const webpush = require('web-push');
const Orders = require('../../../db/orders.model');
const Trucks = require('../../../db/trucks.model');

webpush.setVapidDetails('mailto:test@gmail.com', process.env.VAPID_PUB, process.env.VAPID_PRIV);

module.exports = {
  get(req, res) {
    Orders.query()
      .where('truck_id', '=', req.params.truckId)
      .eager('orderitems.menu_item')
      .then(order => res.status(200).json(order))
      .catch(e => res.status(400).send(e.message));
  },
  post(req, res) {
    let newOrder;
    Orders.query()
    .insertGraph(req.body)
    .then((order) => {
      newOrder = order;
      return Trucks.query()
      .findById(req.params.truckId)
      .eager('brands.[owners.[user_push_info(first)]]', {
        first: builder => builder.first(),
      });
    })
    .then((truck) => {
      const message = `A new order has been placed with ${truck.brands.name}'s ${truck.name} Truck.`;
      return webpush.sendNotification(JSON.parse(truck.brands.owners.user_push_info.subscription), message);
    })
    .then(() => res.status(201).send(newOrder))
    .catch((e) => {
      console.log(e);
      res.status(400).send(e.message);
    });
  },
  put(req, res) {
    Trucks.query()
      .where('id', '=', req.params.truckId)
      .patch(req.body)
      .then(truck => res.status(200).json(truck))
      .catch(e => res.status(400).send(e.message));
  },
};
