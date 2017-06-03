import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Col } from 'react-flexbox-grid';
import Paper from 'material-ui/Paper';
import CreateEvent from './CreateEvent';
import EventsList from './EventsList';
import EventDetail from './EventDetail';

class Event extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <Col xs={12} sm={12} md={12} lg={12}>
        <Paper zDepth={1} >
          <Switch>
            <Route path="/events/create" component={CreateEvent} />
            <Route path="/events/:eventId" component={EventDetail} />
            <Route path="/events" component={EventsList} />
          </Switch>
        </Paper>
      </Col>
    );
  }
}

export default Event;
