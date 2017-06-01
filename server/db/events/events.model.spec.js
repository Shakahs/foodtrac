const moment = require('moment');
const Events = require('./events.model');
const { provideModelWithKnex } = require('../../../dbutil');

let boundEvents = null;
let newEvent = null;

beforeAll(() => {
  boundEvents = provideModelWithKnex(Events);
  const startTime = moment.utc();
  const endTime = moment.utc().add(1, 'hours');
  newEvent = {
    start: startTime.toISOString(),
    end: endTime.toISOString(),
    name: 'a great event',
    description: 'come have fun',
    location_id: 1,
    owner_id: 1,
  };
});

describe('Events model', () => {
  test('it should insert an event', () => boundEvents.query().insert(newEvent)
      .then((result) => {
        delete result.id; // eslint-disable-line no-param-reassign
        expect(result).toEqual(newEvent);
      }));
});

afterAll(() => boundEvents.knex().destroy());

