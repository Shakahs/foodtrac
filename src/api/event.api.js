import axios from 'axios';

export function createEvent(newEvent, locationObj) {
  if (locationObj) {
    newEvent.locations = locationObj; // eslint-disable-line no-param-reassign
  }
  return axios.post('/api/events', newEvent);
}

export function userRegisterAttendEvent(eventId, userId) {
  return axios.post(`/api/events/${eventId}/user_attendance`, { userId });
}

export function userUnregisterAttendEvent(eventId, userId) {
  return axios.delete(`/api/events/${eventId}/user_attendance/${userId}`);
}
