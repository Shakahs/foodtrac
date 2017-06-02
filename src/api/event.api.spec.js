import { testEventGenerator } from '../../testData';
import post from './event.api';

const Events = require('../../server/db/events/events.model');
const { provideModelWithKnex } = require('../../dbutil');

const boundEvents = provideModelWithKnex(Events);
const testEvent = testEventGenerator();

describe('test the Events API', () => {
  test('it should post an event', () => {
    post(testEvent)
      .then(() => boundEvents.query().findById(testEvent.id))
      .then(foundEvent => expect(foundEvent).toEqual(testEvent));
  });
});

