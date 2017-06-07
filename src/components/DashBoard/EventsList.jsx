import _ from 'lodash';
import React from 'react';
import { Grid, Row } from 'react-flexbox-grid';
import { Card, CardTitle } from 'material-ui';
import EventsListEntry from '../Events/EventsListEntry';
import propSchema from '../common/PropTypes';

const EventsList = props => (
  <Card>
    <CardTitle
      title="Events You've RSVP'd To"
      subtitle={`${props.events.length} Events`}
    />
    <Grid fluid>
      <Row>
        {props.events.length > 0
          ? _.map(props.events, event => <EventsListEntry event={event} />)
          : <h2>{'You have not yet RSVP\'d to any events'}</h2>}
      </Row>
    </Grid>
  </Card>
);

EventsList.propTypes = {
  events: propSchema.events,
};

export default EventsList;
