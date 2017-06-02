import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import CreateEvent from './CreateEvent';
import EventsList from './EventsList';

class Event extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <Switch>
        <Route path="/events/create" component={CreateEvent} />
        <Route path="/events" component={EventsList} />
      </Switch>
    );
  }
}

export default Event;
