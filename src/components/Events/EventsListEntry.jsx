import React from 'react';
import { Grid } from 'react-flexbox-grid';
import { Link } from 'react-router-dom';
import propSchema from '../common/PropTypes';

const EventsListEntry = props => (
  <Grid fluid>
    <div>
      <Link to={`/events/${props.event.id}`}>
      Event: {props.event.name}
      </Link>
    </div>
  </Grid>
);

EventsListEntry.propTypes = {
  event: propSchema.event,
};

export default EventsListEntry;
