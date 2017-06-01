const moment = require('moment');
const Chance = require('chance');
const Events = require('./events.model');
const Users = require('../users.model');
const Locations = require('../locations.model');
const UserAttendees = require('./userattendees.model');
const BrandAttendees = require('./brandattendees.model');
const Brands = require('../brands.model');
const { provideModelWithKnex } = require('../../../dbutil');

const boundEvents = provideModelWithKnex(Events);
const boundUsers = provideModelWithKnex(Users);
const boundLocations = provideModelWithKnex(Locations);
const boundUserAttendees = provideModelWithKnex(UserAttendees);
const boundBrandAttendees = provideModelWithKnex(BrandAttendees);
const boundBrands = provideModelWithKnex(Brands);
let newEvent = null;
let newUserAttendee = null;
let newBrandAttendee = null;

const chance = new Chance();

beforeAll(() => {
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

describe('test the Events model', () => {
  test('it should insert an event', () => boundEvents.query()
      .findById(newEvent.id)
      .then((result) => {
        expect(result).toEqual(newEvent);
      }));

  test('it should return an Owner and Location based on relationship', () =>
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

describe('test the UserAttendee model', () => {
  beforeAll(() => {
    newUserAttendee = {
      id: chance.integer({ min: 10000, max: 100000 }),
      event_id: newEvent.id,
      user_id: 1,
    };
    return boundUserAttendees.query().insert(newUserAttendee);
  });

  test('it should insert a UserAttendee', () => boundUserAttendees.query()
      .findById(newUserAttendee.id)
      .then((result) => {
        expect(result).toEqual(newUserAttendee);
      }));

  test('it should return an Event and User based on relationship', () =>
    boundUserAttendees.query()
      .findById(newUserAttendee.id)
      .eager('[users, events]')
      .then((result) => {
        expect(result.users.id).toEqual(newUserAttendee.user_id);
        expect(result.events.id).toEqual(newUserAttendee.event_id);
      }));

  test('User should be able to find UserAttendee by relationship', () =>
    boundUsers.query()
      .findById(newUserAttendee.user_id)
      .eager('[events_attending]')
      .then((result) => {
        expect(result.events_attending).toContainEqual(newUserAttendee);
      }));

  test('Event should be able to find UserAttendee by relationship', () =>
    boundEvents.query()
      .findById(newUserAttendee.event_id)
      .eager('[users_attending]')
      .then((result) => {
        expect(result.users_attending).toContainEqual(newUserAttendee);
      }));
});

describe('test the BrandAttendee model', () => {
  beforeAll(() => {
    newBrandAttendee = {
      id: chance.integer({ min: 10000, max: 100000 }),
      event_id: newEvent.id,
      brand_id: 1,
    };
    return boundBrandAttendees.query().insert(newBrandAttendee);
  });

  test('it should insert a BrandAttendee', () => boundBrandAttendees.query()
    .findById(newBrandAttendee.id)
    .then((result) => {
      expect(result).toEqual(newBrandAttendee);
    }));

  test('it should return an Event and Brand based on relationship', () =>
    boundBrandAttendees.query()
      .findById(newBrandAttendee.id)
      .eager('[brands, events]')
      .then((result) => {
        expect(result.brands.id).toEqual(newBrandAttendee.brand_id);
        expect(result.events.id).toEqual(newUserAttendee.event_id);
      }));

  test('Brand should be able to find BrandAttendee by relationship', () =>
    boundBrands.query()
      .findById(newBrandAttendee.brand_id)
      .eager('[events_attending]')
      .then((result) => {
        expect(result.events_attending).toContainEqual(newBrandAttendee);
      }));

  test('Event should be able to find BrandAttendee by relationship', () =>
    boundEvents.query()
      .findById(newBrandAttendee.event_id)
      .eager('[brands_attending]')
      .then((result) => {
        expect(result.brands_attending).toContainEqual(newBrandAttendee);
      }));
});

afterAll(() => {
  boundEvents.knex().destroy();
  boundUsers.knex().destroy();
  boundLocations.knex().destroy();
  boundUserAttendees.knex().destroy();
  boundBrandAttendees.knex().destroy();
  boundBrands.knex().destroy();
});

