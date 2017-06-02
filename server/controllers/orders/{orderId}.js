const Orders = require('../../db/orders.model');

module.exports = {
  put(req, res) {
    Orders.query()
      .where('id', '=', req.params.orderId)
      .patch(req.body)
      .then(truck => res.status(200).json(truck))
      .catch(e => console.log('Error updating truck:', e));
  },
};
