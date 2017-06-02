import moment from 'moment';

const combineDates = (newEventDate, newEventTimeStart, newEventTimeEnd) => {
  const newEventStart = moment(newEventDate);
  newEventStart.set('hour', newEventTimeStart.get('hour'));
  newEventStart.set('minute', newEventTimeStart.get('minute'));
  newEventStart.set('second', newEventTimeStart.get('second'));

  const newEventEnd = moment(newEventDate);
  newEventEnd.set('hour', newEventTimeEnd.get('hour'));
  newEventEnd.set('minute', newEventTimeEnd.get('minute'));
  newEventEnd.set('second', newEventTimeEnd.get('second'));

  return { newEventStart, newEventEnd };
};

export default combineDates;
