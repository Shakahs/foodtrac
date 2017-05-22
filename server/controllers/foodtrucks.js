const Trucks = require('../db/trucks.model');

module.exports = {
  get(req, res) {
    // TODO: add distance logic
    res.send('Pending distance logic');
  },
  post(req, res) {
    Trucks.query()
      .insert(req.body)
      .then(() => res.sendStatus(201))
      .catch((e) => {
        console.log('Error inserting new truck:', e);
        res.sendStatus(400);
      });
  },
};
