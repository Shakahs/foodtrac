import moment from 'moment';
import combineDates from './util';

describe('create event date compilation utility', () => {
  test('should correctly combine input times', () => {
    const eventDate = moment().add(7, 'days');
    const eventStartTime = moment().set('hour', 8).set('minute', 10);
    const eventEndTime = moment().set('hour', 10).set('minute', 30);

    const { newEventStart, newEventEnd } = combineDates(eventDate, eventStartTime, eventEndTime);

    expect(newEventStart.format('YYYY MM DD')).toEqual(eventDate.format('YYYY MM DD'));
    expect(newEventStart.format('HHmmss')).toEqual(eventStartTime.format('HHmmss'));

    expect(newEventEnd.format('YYYY MM DD')).toEqual(eventDate.format('YYYY MM DD'));
    expect(newEventEnd.format('HHmmss')).toEqual(eventEndTime.format('HHmmss'));
  });
});
