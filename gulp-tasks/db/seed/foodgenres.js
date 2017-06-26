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
    insertSeed('FoodGenres', ['Mexican', 'Korean', 'BBQ', 'Burgers', 'Grilled Cheese', 'Pho'])
      .then(() => checkSeededTable(FoodGenres));
  },
};
