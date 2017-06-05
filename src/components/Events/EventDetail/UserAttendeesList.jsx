import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import UserEmblem from '../../common/Emblem/UserEmblem';
import propSchema from '../../common/PropTypes';

const UserAttendeesList = props => (
  <div>
    The following users are attending:
    {props.attendees.length > 0 ?
    _.map(props.attendees, attendee => <UserEmblem user={attendee.users} />)
    :
    <div className="noItems">No Reviews</div>
  }
  </div>
);

UserAttendeesList.propTypes = {
  attendees: PropTypes.arrayOf(propSchema.user),
};

export default UserAttendeesList;
