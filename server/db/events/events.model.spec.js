const moment = require('moment');
const Chance = require('chance');
const Events = require('./events.model');
const Users = require('../users.model');
const Locations = require('../locations.model');
const { provideModelWithKnex } = require('../../../dbutil');

let boundEvents = null;
let boundUsers = null;
let boundLocations = null;
let newEvent = null;

const chance = new Chance();

beforeAll(() => {
  boundEvents = provideModelWithKnex(Events);
  boundUsers = provideModelWithKnex(Users);
  boundLocations = provideModelWithKnex(Locations);
  const startTime = moment.utc();
  const endTime = moment.utc().add(1, 'hours');
  newEvent = {
    id: chance.integer({ min: 10000, max: 100000 }),
    start: startTime.toDate(),
    end: endTime.toDate(),
    name: 'a great event',
    description: 'come have fun',
    location_id: 1,
    owner_id: 1,
  };
  const insertEvent = Object.assign({}, newEvent);
  insertEvent.start = insertEvent.start.toISOString();
  insertEvent.end = insertEvent.end.toISOString();
  return boundEvents.query().insert(insertEvent);
});

describe('Events model', () => {
  test('it should insert an event', () => {
    boundEvents.query()
      .findById(newEvent.id)
      .then((result) => {
        expect(result).toEqual(newEvent);
      });
  });

  test('it should return an owner and location based on relationship', () =>
    boundEvents.query()
      .findById(newEvent.id)
      .eager('[locations, owners]')
      .then((result) => {
        expect(result.owners.id).toEqual(newEvent.owner_id);
        expect(result.locations.id).toEqual(newEvent.location_id);
      }));

  test('owner should be able to find event by relationship', () =>
    boundUsers.query()
      .findById(newEvent.owner_id)
      .eager('[events]')
      .then((result) => {
        expect(result.events).toContainEqual(newEvent);
      }));

  test('location should be able to find event by relationship', () =>
    boundLocations.query()
      .findById(newEvent.location_id)
      .eager('[events]')
      .then((result) => {
        expect(result.events).toContainEqual(newEvent);
      }));
});

afterAll(() => {
  boundEvents.knex().destroy();
  boundUsers.knex().destroy();
  boundLocations.knex().destroy();
});

