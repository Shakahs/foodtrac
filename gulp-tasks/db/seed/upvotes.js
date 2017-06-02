const jsf = require('json-schema-faker');
const Upvotes = require('../../../server/db/upvotes.model');
const Users = require('../../../server/db/users.model');
const Brands = require('../../../server/db/brands.model');
const LocationTimelines = require('../../../server/db/locationtimelines.model');
const { insertSeed } = require('../../../dbutil');
const { checkSeededTable } = require('../../../dbutil');
const { provideModelWithKnex } = require('../../../dbutil');

module.exports = {
  fn() {
    const upvotesSchema = {
      type: 'array',
      uniqueItems: true,
      items: Upvotes.jsonSchema,
    };
    const boundUsers = provideModelWithKnex(Users);
    const boundBrands = provideModelWithKnex(Brands);
    const boundTimelines = provideModelWithKnex(LocationTimelines);
    let usersList = [];
    let brandsList = [];
    let timelinesList = [];
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
    .then(() => boundTimelines.query())
    .then((res) => {
      timelinesList = res;
      return boundTimelines.knex().destroy();
    })
    .then(() => {
      upvotesSchema.minItems = brandsList.length;
      upvotesSchema.maxItems = brandsList.length;
      return jsf.resolve(upvotesSchema);
    })
    .then(seedData => seedData.map((seedDataItem) => {
      const newSeedDataItem = Object.assign({}, seedDataItem);
      newSeedDataItem.brand_id = brandsList.pop().id;
      newSeedDataItem.user_id = usersList.pop().id;
      newSeedDataItem.timeline_id = timelinesList.pop().id;
      return newSeedDataItem;
    }))
    .then(seedData => insertSeed('Upvotes', seedData))
    .then(() => checkSeededTable(Upvotes));
  },
};
