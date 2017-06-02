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
    const foodGenreSchema = {
      type: 'array',
      minItems: 6,
      maxItems: 6,
      uniqueItems: true,
      items: FoodGenres.jsonSchema,
    };
    return jsf.resolve(foodGenreSchema)
      .then(seedData => insertSeed('FoodGenres', seedData))
      .then(() => checkSeededTable(FoodGenres));
  },
};
