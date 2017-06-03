import React from 'react';
import { connect } from 'react-refetch';
import { Grid } from 'react-flexbox-grid';
import PropTypes from 'prop-types';
import UserAttendeesList from './UserAttendeesList';
import BrandAttendeesList from './BrandAttendeesList';

class EventDetail extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { eventFetch } = this.props;

    if (eventFetch.fulfilled) {
      return (
        <Grid fluid>
          <h2>
            {eventFetch.value.name}
          </h2>
          <h4>
            {eventFetch.value.description}
          </h4>
          <div><br />
            <BrandAttendeesList attendees={eventFetch.value.brands_attending} />
          </div>
          <div><br />
            <UserAttendeesList attendees={eventFetch.value.users_attending} />
          </div>
        </Grid>
      );
    }
    return (<div>Loading</div>);
  }
}

EventDetail.propTypes = {
  eventFetch: PropTypes.shape({
    value: PropTypes.array,
  }),
};

export default connect(props => ({
  eventFetch: `/api/events/${props.match.params.eventId}`,
}))(EventDetail);
