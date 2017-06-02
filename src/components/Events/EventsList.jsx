import React from 'react';
import { Link } from 'react-router-dom';

const EventsList = () => (
  <div>
    <Link to={'/events/create'}>Create an event</Link><br />
    A list of events
  </div>
);

export default EventsList;
