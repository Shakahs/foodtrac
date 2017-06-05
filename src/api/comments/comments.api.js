import axios from 'axios';

export function createEventComment(text, userId, eventId) {
  return axios.post(`/api/events/${eventId}/comments`, {
    text,
    user_id: userId,
    event_id: eventId,
  });
}

export function editEventComment(text, commentId, eventId) {
  return axios.put(`/api/events/${eventId}/comments/${commentId}`, { text });
}

export function deleteEventComment(commentId, eventId) {
  return axios.delete(`/api/events/${eventId}/comments/${commentId}`);
}
