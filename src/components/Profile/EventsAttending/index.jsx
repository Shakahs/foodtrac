import React from 'react';
import { Link } from 'react-router-dom';
import { Grid } from 'react-flexbox-grid';
import _ from 'lodash';
import EventsListEntry from '../../Events/EventsListEntry';
import propSchema from '../../common/PropTypes';

const EventsAttendingList = props => (

  <Grid fluid>
    <div>
      <Link to={'/events/create'}>Create an event</Link>
    </div>
    {props.brand.events_attending && props.brand.events_attending.length > 0 ?
  _.map(props.brand.events_attending, event => <EventsListEntry event={event.events} />)
  :
  <div className="noItems">This truck is not attending any events</div>
  }
  </Grid>
);

EventsAttendingList.propTypes = {
  brand: propSchema.brands,
};

export default EventsAttendingList;
