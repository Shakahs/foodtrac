import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Col } from 'react-flexbox-grid';
import Paper from 'material-ui/Paper';
import { connect } from 'react-redux';
import CreateEvent from './CreateEvent';
import EventsList from './EventsList';
import EventDetail from './EventDetail';

const Event = props => (
  <Col xs={12} sm={12} md={12} lg={12}>
    <Paper zDepth={1} >
      <Switch>
        <Route path="/events/create" component={CreateEvent} />
        <Route path="/events/:eventId" render={routeProps => <EventDetail {...routeProps} {...props} eventId={routeProps.match.params.eventId} />} />
        <Route path="/events" component={EventsList} />
      </Switch>
    </Paper>
  </Col>
);

const mapStateToProps = state => ({
  user: state.user,
});

export default connect(mapStateToProps, null)(Event);
