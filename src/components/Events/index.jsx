import React, { Component } from 'react';
import EventInfo from './EventInfo';
import AttendeesList from './AttendeesList';
// import CommentsList from './CommentsList';

class Event extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <div>
        <EventInfo />
        <AttendeesList />
        {/* <CommentsList />*/}
      </div>
    );
  }
}

export default Event;
