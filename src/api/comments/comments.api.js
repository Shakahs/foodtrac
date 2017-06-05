import axios from 'axios';

export function createEventComment(text, userId, eventId) {
  return axios.post(`/api/events/${eventId}/comments`, {
    text,
    user_id: userId,
    event_id: eventId,
  });
}

export function editEventComment(text, eventId) {
  return axios.put(`/api/events/${eventId}/comments`, { text });
}

export function deleteEventComment(eventId, commentId) {
  return axios.post(`/api/events/${eventId}/comments/${commentId}`);
}
