const FoodGenres = require('../db/foodgenres.model');

module.exports = {
  get(req, res) {
    FoodGenres.query()
      .then(foodgenres => res.status(200).send(foodgenres))
      .catch(e => res.status(400).send(e.message));
  },
};
