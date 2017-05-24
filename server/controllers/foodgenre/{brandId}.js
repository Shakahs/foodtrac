const FoodGenre = require('../../db/foodgenres.model');

module.exports = {
  get(req, res) {
    FoodGenre.query()
      .where('id', '=', req.params.brandId)
      .then(genre => res.status(200).json(genre))
      .catch((e) => {
        console.log('Error fetching food genre info:', e);
        res.sendStatus(400);
      });
  },
};
