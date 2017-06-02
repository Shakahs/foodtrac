const jsf = require('json-schema-faker');
const Faker = require('faker');
const Chance = require('chance');
const Users = require('../../../server/db/users.model');
const Brands = require('../../../server/db/brands.model');
const BrandComments = require('../../../server/db/brandcomments.model');
const { insertSeed } = require('../../../dbutil');
const { checkSeededTable } = require('../../../dbutil');
const { provideModelWithKnex } = require('../../../dbutil');

const chance = new Chance();
jsf.extend('faker', () => Faker);
jsf.extend('chance', () => chance);

module.exports = {
  fn() {
    const brandCommentsSchema = {
      type: 'array',
      uniqueItems: true,
      items: BrandComments.jsonSchema,
    };
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
      .then(() => {
        brandCommentsSchema.minItems = brandsList.length;
        brandCommentsSchema.maxItems = brandsList.length;
        return jsf.resolve(brandCommentsSchema);
      })
      .then(seedData => seedData.map((seedDataItem) => {
        const newSeedDataItem = Object.assign({}, seedDataItem);
        newSeedDataItem.brand_id = brandsList.pop().id;
        newSeedDataItem.user_id = usersList.pop().id;
        return newSeedDataItem;
      }))
      .then(seedData => insertSeed('BrandComments', seedData))
      .then(() => checkSeededTable(BrandComments));
  },
};
