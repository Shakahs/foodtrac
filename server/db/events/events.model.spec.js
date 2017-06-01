const moment = require('moment');
const Events = require('./events.model');
const { provideModelWithKnex } = require('../../../dbutil');

let boundEvents = null;

beforeAll(() => {
  boundEvents = provideModelWithKnex(Events);
});

describe('Events model', () => {
  test('it should insert an event', () => {
    const startTime = moment.utc();
    const endTime = moment.utc().add(1, 'hours');
    const newEvent = {
      id: 2001,
      start: startTime.toISOString(),
      end: endTime.toISOString(),
      name: 'a great event',
      description: 'come have fun',
      location_id: 1,
      owner_id: 1,
    };

    return boundEvents.query().insert(newEvent)
      .then((result) => { expect(result).toEqual(newEvent); });
      // .finally(() => {});
  });
});

afterAll(() => boundEvents.knex().destroy());

