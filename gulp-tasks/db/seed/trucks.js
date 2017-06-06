const jsf = require('json-schema-faker');
const Faker = require('faker');
const Chance = require('chance');
const Trucks = require('../../../server/db/trucks.model');
const Brands = require('../../../server/db/brands.model');
const { insertSeed } = require('../../../dbutil');
const { checkSeededTable } = require('../../../dbutil');
const { provideModelWithKnex } = require('../../../dbutil');

const chance = new Chance();
jsf.extend('faker', () => Faker);
jsf.extend('chance', () => chance);

module.exports = {
  fn() {
    const truckSchema = {
      type: 'array',
      uniqueItems: true,
      items: Trucks.jsonSchema,
    };
    const boundBrands = provideModelWithKnex(Brands);
    let brandList = [];
    return boundBrands.query()
      .then((res) => {
        brandList = res;
        return boundBrands.knex().destroy();
      })
      .then(() => {
        truckSchema.minItems = brandList.length;
        truckSchema.maxItems = brandList.length;
        return jsf.resolve(truckSchema);
      })
      .then(seedData => seedData.map((seedDataItem) => {
        const newSeedDataItem = Object.assign({}, seedDataItem);
        newSeedDataItem.brand_id = brandList.pop().id;
        newSeedDataItem.order = chance.bool();
        return newSeedDataItem;
      }))
      .then(seedData => insertSeed('Trucks', seedData))
      .then(() => checkSeededTable(Trucks));
  },
};
