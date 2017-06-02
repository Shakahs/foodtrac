import axios from 'axios';

const post = (newEvent, locationObj) => {
  if (locationObj) {
    newEvent.locations = locationObj; // eslint-disable-line no-param-reassign
  }
  return axios.post('/api/event', newEvent);
};

export default post;
