import React from 'react';
import { Link } from 'react-router-dom';
import { Grid } from 'react-flexbox-grid';
import _ from 'lodash';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import axios from 'axios';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import PropTypes from 'prop-types';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import EventsListEntry from './EventsListEntry';
import { actions as userActions } from '../../redux/user';

BigCalendar.setLocalizer(
  BigCalendar.momentLocalizer(moment),
);

class EventsList extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      events: [],
    };
  }

  componentDidMount() {
    axios.get('/api/events/')
      .then(({ data }) => {
        this.setState({ events: data });
      });
  }

  render() {
    return (
      <Grid fluid>
        <div>
          <Link to={'/events/create'}>Create an event</Link><br />
        </div>
        <div>
          <BigCalendar
            events={this.props.userEvents}
            onSelectEvent={event => this.props.history.push(`/events/${event.id}`)}
          />
        </div>
        <div>
          {this.state.events.length > 0 ?
            _.map(this.state.events, event => <EventsListEntry event={event} />)
            :
            <div className="noItems">No events to display</div>
          }
        </div>
      </Grid>
    );
  }
}

EventsList.propTypes = {
  userEvents: PropTypes.arrayOf(PropTypes.object),
  history: PropTypes.func.isRequired,
};

const generateCalendarEvents = (state) => {
  // debugger
  const userEvents = [];
  if (state.user && state.user.events_attending) {
    state.user.events_attending.forEach((event) => {
      userEvents[event.events.id] = {
        id: event.events.id,
        title: event.events.name,
        start: new Date(event.events.start),
        end: new Date(event.events.end),
      };
    });
  }
  return userEvents;
};

const mapStateToProps = state => ({
  user: state.user,
  userEvents: generateCalendarEvents(state),
});

const mapDispatchToProps = dispatch => ({
  userActions: bindActionCreators(userActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(EventsList);
