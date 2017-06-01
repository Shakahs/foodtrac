require('dotenv').config({ path: '../../../.env' });
const { Model } = require('objection');
const knexConfig = require('../../../knexfile');
const knex = require('knex')(knexConfig.development);

const Events = require('./events.model');
const moment = require('moment');

Model.knex(knex);

describe('Events model', () => {
  test('it should insert an event', () => {
    const startTime = moment.utc();
    const endTime = moment.utc().add(1, 'hours');
    const newEvent = {
      id: 1,
      start: startTime.toISOString(),
      end: endTime.toISOString(),
      name: 'a great event',
      description: 'come have fun',
      location_id: 1,
      owner_id: 1,
    };

    expect(Events.query().insert(newEvent))
      .resolves.toEqual(newEvent);
  });
});

afterAll(() => Events
    .query()
    .deleteById(1)
    .then(() => Events.knex().destroy()));
