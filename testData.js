const moment = require('moment');
const Chance = require('chance'); // eslint-disable-line import/no-extraneous-dependencies

const chance = new Chance();

const startTime = moment.utc();
const endTime = moment.utc().add(1, 'hours');

module.exports.testEvent = {
  id: chance.integer({ min: 10000, max: 100000 }),
  start: startTime.toDate(),
  end: endTime.toDate(),
  name: 'a great event',
  description: 'come have fun',
  location_id: 1,
  owner_id: 1,
};

