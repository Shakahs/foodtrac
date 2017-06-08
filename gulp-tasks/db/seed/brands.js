const jsf = require('json-schema-faker');
const Faker = require('faker');
const Chance = require('chance');
const Brands = require('../../../server/db/brands.model');
const Users = require('../../../server/db/users.model');
const FoodGenres = require('../../../server/db/foodgenres.model');
const { provideModelWithKnex } = require('../../../dbutil');
const { insertSeed } = require('../../../dbutil');
const { checkSeededTable } = require('../../../dbutil');

const chance = new Chance();
jsf.extend('faker', () => Faker);
jsf.extend('chance', () => chance);

module.exports = {
  fn() {
    const brandSchema = {
      type: 'array',
      uniqueItems: true,
      items: Brands.jsonSchema,
    };
    const boundUsers = provideModelWithKnex(Users);
    const boundFoodGenres = provideModelWithKnex(FoodGenres);
    let userList = [];
    let foodGenres = [];
    return boundUsers.query()
      .where('is_truck_owner', true)
      .then((res) => {
        userList = res;
        return boundUsers.knex().destroy();
      })
      .then(() => boundFoodGenres.query())
      .then((res) => {
        foodGenres = res;
        return boundFoodGenres.knex().destroy();
      })
      .then(() => {
        brandSchema.minItems = userList.length;
        brandSchema.maxItems = userList.length;
        return jsf.resolve(brandSchema);
      })
      .then((seedData) => {
        const newSeedData = seedData.map((seedDataItem) => {
          const newSeedDataItem = Object.assign({}, seedDataItem);
          newSeedDataItem.owner_id = userList.pop().id;
          newSeedDataItem.food_genre_id = chance.pickone(foodGenres).id;
          delete newSeedDataItem.default_coupon_id;
          delete newSeedDataItem.cover_image_id;
          newSeedDataItem.name += ' Truck';
          return newSeedDataItem;
        });
        return newSeedData;
      })
      .then(seedData => insertSeed('Brands', seedData))
      .then(() => checkSeededTable(Brands));
  },
};
