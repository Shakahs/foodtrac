import React from 'react';
import _ from 'lodash';
import BrandAttendeesListEntry from './BrandAttendeesListEntry';

const BrandAttendeesList = props => (
  <div>
    The following Brands are attending:
    {props.attendees.length > 0 ?
      _.map(props.attendees, attendee => <BrandAttendeesListEntry attendee={attendee} />)
      :
      <div className="noItems">No Reviews</div>
    }
  </div>
);

export default BrandAttendeesList;
