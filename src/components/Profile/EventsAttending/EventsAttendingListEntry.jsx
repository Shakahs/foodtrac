import React from 'react';
import { Grid } from 'react-flexbox-grid';
import propSchema from '../../common/PropTypes';

const EventsAttendingListEntry = props => (
  <Grid fluid>
    <div>attending {props.event.events.name} on {props.event.events.start}</div>
  </Grid>
);

EventsAttendingListEntry.propTypes = {
  event: propSchema.event,
};

export default EventsAttendingListEntry;
