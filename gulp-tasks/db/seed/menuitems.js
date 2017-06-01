const jsf = require('json-schema-faker');
const Faker = require('faker');
const Chance = require('chance');
const MenuItems = require('../../../server/db/menuitems.model');
const Brands = require('../../../server/db/brands.model');
const { insertSeed } = require('../../../dbutil');
const { checkSeededTable } = require('../../../dbutil');
const { provideModelWithKnex } = require('../../../dbutil');

const chance = new Chance();
jsf.extend('faker', () => Faker);
jsf.extend('chance', () => chance);

module.exports = {
  fn() {
    const menuItemsSchema = {
      type: 'array',
      uniqueItems: true,
      items: MenuItems.jsonSchema,
    };
    const boundBrands = provideModelWithKnex(Brands);
    let brandList = [];
    return boundBrands.query()
      .then((res) => {
        brandList = res;
        return boundBrands.knex().destroy();
      })
      .then(() => {
        menuItemsSchema.minItems = brandList.length;
        menuItemsSchema.maxItems = brandList.length;
        return jsf.resolve(menuItemsSchema);
      })
      .then(seedData => seedData.map((seedDataItem) => {
        const newSeedDataItem = Object.assign({}, seedDataItem);
        newSeedDataItem.brand_id = brandList.pop().id;
        return newSeedDataItem;
      }))
      .then(seedData => insertSeed('MenuItems', seedData))
      .then(() => checkSeededTable(MenuItems));
  },
};

