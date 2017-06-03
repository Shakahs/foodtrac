import React from 'react';
import _ from 'lodash';
import UserAttendeesListEntry from './UserAttendeesListEntry';

const UserAttendeesList = props => (
  <div>
    The following users are attending:
    {props.attendees.length > 0 ?
    _.map(props.attendees, attendee => <UserAttendeesListEntry attendee={attendee} />)
    :
    <div className="noItems">No Reviews</div>
  }
  </div>
);

export default UserAttendeesList;
