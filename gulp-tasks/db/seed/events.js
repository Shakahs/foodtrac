const moment = require('moment');
const jsf = require('json-schema-faker');
const Faker = require('faker');
const Chance = require('chance');
const Events = require('../../../server/db/events/events.model');
const Brands = require('../../../server/db/brands.model');
const Locations = require('../../../server/db/locations.model');
const { insertSeed } = require('../../../dbutil');
const { checkSeededTable } = require('../../../dbutil');
const { provideModelWithKnex } = require('../../../dbutil');

const chance = new Chance();
jsf.extend('faker', () => Faker);
jsf.extend('chance', () => chance);

module.exports = {
  fn() {
    let brandList = [];
    let locationList = [];
    const boundBrands = provideModelWithKnex(Brands);
    const boundLocations = provideModelWithKnex(Locations);
    return boundBrands.query()
      .then((res) => {
        brandList = res;
        return boundBrands.knex().destroy();
      })
      .then(() => boundLocations.query())
      .then((res) => {
        locationList = res;
        return boundLocations.knex().destroy();
      })
      .then(() => {
        const resultEvents = [];
        brandList.forEach((brand) => {
          if (chance.bool()) {
            const start = moment.utc().add(chance.integer({ min: 0, max: 30 }), 'days')
              .add(chance.integer({ min: 0, max: 28800 }), 'second');
            const end = moment.utc(start).add(chance.integer({ min: 0, max: 8 }), 'hours')
              .add(chance.integer({ min: 7200, max: 10800 }), 'second');
            const newEvent = {
              event_owner_id: brand.owner_id,
              start: start.toISOString(),
              end: end.toISOString(),
              location_id: chance.pickone(locationList).id,
              name: 'a great event',
              description: 'so much fun',
            };
            resultEvents.push(newEvent);
          }
        });
        return resultEvents;
      })
      .then(seedData => insertSeed('Events', seedData))
      .then(() => checkSeededTable(Events));
  },
};
