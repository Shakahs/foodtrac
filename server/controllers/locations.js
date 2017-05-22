const Locations = require('../db/locations.model');

module.exports = {
  post(req, res) {
    Locations.query()
      .insert(req.body)
      .then(() => res.sendStatus(201))
      .catch((e) => {
        console.log('Error inserting new location:', e);
        res.status(400).send(e.message);
      });
  },
  get(req, res) {
    // TODO: add distance logic
    res.send('Pending distance logic');
    // Locations.query()
    //   .then(result => res.send(result))
    //   .catch((e) => {
    //     console.log('Error fetching locations:', e);
    //     res.sendStatus(400);
    //   });
  },
};
