import axios from 'axios';

const post = newEvent => axios.post('/api/event', newEvent);

export default post;
