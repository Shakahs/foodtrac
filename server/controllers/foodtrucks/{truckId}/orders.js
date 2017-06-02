const Orders = require('../../../db/orders.model');
const Trucks = require('../../../db/trucks.model');

module.exports = {
  get(req, res) {
    Orders.query()
      .where('truck_id', '=', req.params.truckId)
      .eager('orderitems.menu_item')
      .then(order => res.status(200).json(order))
      .catch(e => console.log('Error getting orders:', e));
  },
  post(req, res) {
    Orders.query()
    .insertGraph(req.body)
    .then(order => res.status(201).send(order))
    .catch(e => res.status(400).send(e.message));
  },
  put(req, res) {
    Trucks.query()
      .where('id', '=', req.params.truckId)
      .patch(req.body)
      .then(truck => res.status(200).json(truck))
      .catch(e => console.log('Error updating truck:', e));
  },
};
