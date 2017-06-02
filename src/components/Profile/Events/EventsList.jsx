import React from 'react';
import { Link } from 'react-router-dom';
import { Grid } from 'react-flexbox-grid';
import _ from 'lodash';
import EventsListEntry from './EventsListEntry';
import propSchema from '../../common/PropTypes';

const EventsList = props => (

  <Grid fluid>
    <div>
      <Link to={`/brand/${props.brand.id}/events/create`}>Create an event</Link>
    </div>
    {props.brand.events_attending.length > 0 ?
  _.map(props.brand.events_attending, event => <EventsListEntry event={event} />)
  :
  <div className="noItems">This truck is not attending any events</div>
  }
  </Grid>
);

EventsList.propTypes = {
  brand: propSchema.brands,
};

export default EventsList;
