import { testEventGenerator } from '../../../testData';

const Chance = require('chance');
const Events = require('./events.model');
const Users = require('../users.model');
const Locations = require('../locations.model');
const UserAttendees = require('./userattendees.model');
const BrandAttendees = require('./brandattendees.model');
const EventComments = require('./eventcomments.model');
const Brands = require('../brands.model');
const { provideModelWithKnex } = require('../../../dbutil');

const boundEvents = provideModelWithKnex(Events);
const boundUsers = provideModelWithKnex(Users);
const boundLocations = provideModelWithKnex(Locations);
const boundUserAttendees = provideModelWithKnex(UserAttendees);
const boundBrandAttendees = provideModelWithKnex(BrandAttendees);
const boundBrands = provideModelWithKnex(Brands);
const boundEventComments = provideModelWithKnex(EventComments);
let newUserAttendee = null;
let newBrandAttendee = null;
let newEventComment = null;

const chance = new Chance();

const testEvent = testEventGenerator();

beforeAll(() => {
  const insertEvent = Object.assign({}, testEvent);
  insertEvent.start = insertEvent.start.toISOString();
  insertEvent.end = insertEvent.end.toISOString();
  return boundEvents.query().insert(insertEvent);
});

describe('test the Events model', () => {
  test('it should insert an event', () => boundEvents.query()
      .findById(testEvent.id)
      .then((result) => {
        expect(result).toEqual(testEvent);
      }));

  test('it should return an Owner and Location based on relationship', () =>
    boundEvents.query()
      .findById(testEvent.id)
      .eager('[locations, owners]')
      .then((result) => {
        expect(result.owners.id).toEqual(testEvent.owner_id);
        expect(result.locations.id).toEqual(testEvent.location_id);
      }));

  test('owner should be able to find event by relationship', () =>
    boundUsers.query()
      .findById(testEvent.owner_id)
      .eager('[events]')
      .then((result) => {
        expect(result.events).toContainEqual(testEvent);
      }));

  test('location should be able to find event by relationship', () =>
    boundLocations.query()
      .findById(testEvent.location_id)
      .eager('[events]')
      .then((result) => {
        expect(result.events).toContainEqual(testEvent);
      }));
});

describe('test the UserAttendee model', () => {
  beforeAll(() => {
    newUserAttendee = {
      id: chance.integer({ min: 10000, max: 100000 }),
      event_id: testEvent.id,
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
      event_id: testEvent.id,
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

describe('test the EventComments model', () => {
  beforeAll(() => {
    newEventComment = {
      id: chance.integer({ min: 10000, max: 100000 }),
      event_id: testEvent.id,
      user_id: 1,
      text: 'excited to come to this event!',
    };
    return boundEventComments.query().insert(newEventComment);
  });

  test('it should insert an EventComment', () => boundEventComments.query()
    .findById(newEventComment.id)
    .then((result) => {
      expect(result).toEqual(newEventComment);
    }));

  test('it should return an Event and User based on relationship', () =>
    boundEventComments.query()
      .findById(newEventComment.id)
      .eager('[events, users]')
      .then((result) => {
        expect(result.events.id).toEqual(newEventComment.event_id);
        expect(result.users.id).toEqual(newEventComment.user_id);
      }));

  test('Users should be able to find EventComments by relationship', () =>
    boundUsers.query()
      .findById(newEventComment.user_id)
      .eager('[event_comments]')
      .then((result) => {
        expect(result.event_comments).toContainEqual(newEventComment);
      }));

  test('Events should be able to find EventComments by relationship', () =>
    boundEvents.query()
      .findById(newEventComment.event_id)
      .eager('[comments]')
      .then((result) => {
        expect(result.comments).toContainEqual(newEventComment);
      }));
});

afterAll(() => {
  boundEvents.knex().destroy();
  boundUsers.knex().destroy();
  boundLocations.knex().destroy();
  boundUserAttendees.knex().destroy();
  boundBrandAttendees.knex().destroy();
  boundBrands.knex().destroy();
  boundEventComments.knex().destroy();
});

