import React from 'react';
import { connect } from 'react-refetch';
import { Grid } from 'react-flexbox-grid';
import PropTypes from 'prop-types';

class EventDetail extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { eventFetch } = this.props;

    if (eventFetch.fulfilled) {
      return (
        <Grid fluid>
          here
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
