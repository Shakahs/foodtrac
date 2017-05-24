import React from 'react';
import { Grid } from 'react-flexbox-grid';
import EventEntry from '../common/EventEntry';

// change tempArr with arrays of events
const tempArr = [];

const EventsList = () => (
  <Grid fluid>
    {tempArr.lenght > 0 ?
      tempArr.map(event => <EventEntry event={event} />)
    :
      <div className="noItems">No current Events planned</div>
    }
  </Grid>
);

export default EventsList;
