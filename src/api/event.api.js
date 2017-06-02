import axios from 'axios';

export function createEvent(newEvent, locationObj) {
  if (locationObj) {
    newEvent.locations = locationObj; // eslint-disable-line no-param-reassign
  }
  return axios.post('/api/events', newEvent);
}

export function getEvents() {
  return axios.get('/api/events');
}
