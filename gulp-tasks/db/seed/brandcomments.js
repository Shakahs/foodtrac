const jsf = require('json-schema-faker');
const Faker = require('faker');
const Chance = require('chance');
const Users = require('../../../server/db/users.model');
const Brands = require('../../../server/db/brands.model');
const Comments = require('../../../server/db/comments.model');
const { insertSeed } = require('../../../dbutil');
const { checkSeededTable } = require('../../../dbutil');
const { provideModelWithKnex } = require('../../../dbutil');

const chance = new Chance();
jsf.extend('faker', () => Faker);
jsf.extend('chance', () => chance);

module.exports = {
  fn() {
    const boundUsers = provideModelWithKnex(Users);
    const boundBrands = provideModelWithKnex(Brands);
    let usersList = [];
    let brandsList = [];
    return boundBrands.query()
      .then((res) => {
        brandsList = res;
        return boundBrands.knex().destroy();
      })
      .then(() => boundUsers.query())
      .then((res) => {
        usersList = res;
        return boundUsers.knex().destroy();
      })
      .then(() => brandsList)
      .then(() => {
        const newSeedData = [];
        brandsList.forEach((brand) => {
          for (let i = 0; i < chance.integer({ min: 0, max: 8 }); i++) {
            const newSeedDataItem = {};
            newSeedDataItem.brand_id = brand.id;
            newSeedDataItem.user_id = chance.pickone(usersList).id;
            newSeedDataItem.text = chance.sentence({ sentences: chance.integer({ min: 1, max: 4 }) });
            newSeedData.push(newSeedDataItem);
          }
        });
        return newSeedData;
      })
      .then(seedData => insertSeed('Comments', seedData))
      .then(() => checkSeededTable(Comments));
  },
};
