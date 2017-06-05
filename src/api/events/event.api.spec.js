import { testEventGenerator, testLocationGenerator } from '../../../testData';
import post from './event.api';

const Events = require('../../../server/db/events/events.model');
const { provideModelWithKnex } = require('../../../dbutil');

const boundEvents = provideModelWithKnex(Events);


describe('test the Events API', () => {
  test('it should post an event', () => {
    const testEvent = testEventGenerator();
    post(testEvent)
      .then(() => boundEvents.query().findById(testEvent.id))
      .then(foundEvent => expect(foundEvent).toEqual(testEvent));
  });

  test('it should post an event with an included location', () => {
    const testEvent = testEventGenerator();
    const testLocation = testLocationGenerator();
    testEvent.locations = testLocation;
    post(testEvent)
      .then(() => boundEvents.query().findById(testEvent.id))
      .then((foundEvent) => {
        expect(foundEvent).toEqual(testEvent);
        expect(foundEvent.location_id).toEqual(testLocation.id);
        expect(foundEvent.locations).toEqual(testLocation);
      });
  });
});

