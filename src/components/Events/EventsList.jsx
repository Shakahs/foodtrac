import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-refetch';
import { Grid } from 'react-flexbox-grid';
import _ from 'lodash';
import PropTypes from 'prop-types';
import EventsListEntry from './EventsListEntry';

class EventsList extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { eventsFetch } = this.props;

    if (eventsFetch.fulfilled) {
      return (
        <Grid fluid>
          <div>
            <Link to={'/events/create'}>Create an event</Link><br />
          </div>
          {this.props.eventsFetch.value.length > 0 ?
            _.map(this.props.eventsFetch.value, event => <EventsListEntry event={event} />)
            :
            <div className="noItems">This truck is not attending any events</div>
          }
        </Grid>
      );
    }
    return (<div>Loading</div>);
  }
}

EventsList.propTypes = {
  eventsFetch: PropTypes.shape({
    value: PropTypes.array,
  }),
};

export default connect(() => ({
  eventsFetch: '/api/events/',
}))(EventsList);
