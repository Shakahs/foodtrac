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
        newEvent.id = result.id;
        expect(result).toEqual(newEvent);
      }));

  test('it should return an owner and location based on relationship', () =>
    boundEvents.query()
      .findById(newEvent.id)
      .eager('[locations, owners]')
      .then((result) => {
        console.log(result);
        expect(result.owners.id).toEqual(newEvent.owner_id);
        expect(result.locations.id).toEqual(newEvent.location_id);
      }));
});

afterAll(() => boundEvents.knex().destroy());

