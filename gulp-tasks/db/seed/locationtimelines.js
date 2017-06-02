const moment = require('moment');
const jsf = require('json-schema-faker');
const Faker = require('faker');
const Chance = require('chance');
const Trucks = require('../../../server/db/trucks.model');
const Locations = require('../../../server/db/locations.model');
const LocationTimelines = require('../../../server/db/locationtimelines.model');
const { insertSeed } = require('../../../dbutil');
const { checkSeededTable } = require('../../../dbutil');
const { provideModelWithKnex } = require('../../../dbutil');

const chance = new Chance();
jsf.extend('faker', () => Faker);
jsf.extend('chance', () => chance);

module.exports = {
  fn() {
    const boundTruck = provideModelWithKnex(Trucks);
    const boundLocations = provideModelWithKnex(Locations);
    let truckList = [];
    let locationList = [];
    return boundTruck.query()
      .then((res) => {
        truckList = res;
        return boundTruck.knex().destroy();
      })
      .then(() => boundLocations.query())
      .then((res) => {
        locationList = res;
        return boundLocations.knex().destroy();
      })
      .then(() => {
        const accumulatedSeedData = [];
        truckList.forEach((truck) => {
          const lastSetStart = moment.utc();
          for (let i = 0; i < 5; i++) {
            const newSeedDataItem = {};
            lastSetStart.subtract(chance.integer({ min: 4, max: 7 }), 'hours')
              .subtract(chance.integer({ min: 0, max: 59 }), 'minutes');
            newSeedDataItem.start = moment(lastSetStart);
            newSeedDataItem.end = (chance.bool()) ? moment(newSeedDataItem.start).add(chance.integer({ min: 1, max: 3 }), 'hours')
              .add(chance.integer({ min: 0, max: 59 }), 'minutes').format('YYYY-MM-DD HH:mm:ss') : 0;
            newSeedDataItem.start = newSeedDataItem.start.format('YYYY-MM-DD HH:mm:ss');
            newSeedDataItem.location_id = chance.pickone(locationList).id;
            newSeedDataItem.truck_id = truck.id;
            newSeedDataItem.checked_in = true;
            accumulatedSeedData.push(newSeedDataItem);
          }
        });
        return accumulatedSeedData;
      })
      .then(seedData => insertSeed('LocationTimelines', seedData))
      .then(() => checkSeededTable(LocationTimelines));
  },
};
