import React, {Component} from 'react';
import EventInfo from './EventInfo.jsx';
import AttendeeList from './AttendeeList.jsx';
import CommentsList from './CommentsList.jsx';

class Event extends Component {

  render() {
    return (
    	<div>
	      <EventInfo />
	      <AttendeeList />
	      <CommentsList />
    	</div>
    );
  };
}

export default Event;