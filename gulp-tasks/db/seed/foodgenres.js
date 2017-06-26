const jsf = require('json-schema-faker');
const Faker = require('faker');
const Chance = require('chance');
const FoodGenres = require('../../../server/db/foodgenres.model');
const { insertSeed } = require('../../../dbutil');
const { checkSeededTable } = require('../../../dbutil');

const chance = new Chance();
jsf.extend('faker', () => Faker);
jsf.extend('chance', () => chance);

module.exports = {
  fn() {
    const genres = ['Mexican', 'Korean', 'BBQ', 'Burgers', 'Grilled Cheese', 'Pho'];
    const genresObj = genres.map(genre => ({ name: genre }));
    insertSeed('FoodGenres', genresObj)
      .then(() => checkSeededTable(FoodGenres));
  },
};
