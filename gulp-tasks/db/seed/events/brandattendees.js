const jsf = require('json-schema-faker');
const Faker = require('faker');
const Chance = require('chance');
const Brands = require('../../../../server/db/brands.model');
const Events = require('../../../../server/db/events/events.model');
const BrandAttendees = require('../../../../server/db/events/brandattendees.model');
const { insertSeed, checkSeededTable, provideModelWithKnex } = require('../../../../dbutil');

const chance = new Chance();
jsf.extend('faker', () => Faker);
jsf.extend('chance', () => chance);

module.exports = {
  fn() {
    let brandList = [];
    let eventList = [];
    const boundBrands = provideModelWithKnex(Brands);
    const boundEvents = provideModelWithKnex(Events);
    return boundBrands.query()
      .then((res) => {
        brandList = res;
        return boundBrands.knex().destroy();
      })
      .then(() => boundEvents.query())
      .then((res) => {
        eventList = res;
        return boundEvents.knex().destroy();
      })
      .then(() => {
        const seedBrands = [];
        brandList.forEach((brand) => {
          if (chance.bool()) {
            const attendee = {
              event_id: chance.pickone(eventList).id,
              brand_id: brand.id,
            };
            seedBrands.push(attendee);
          }
        });
        return seedBrands;
      })
      .then(seedData => insertSeed('BrandAttendees', seedData))
      .then(() => checkSeededTable(BrandAttendees));
  },
};
