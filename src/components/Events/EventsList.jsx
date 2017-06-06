import React from 'react';
import { Link } from 'react-router-dom';
import { Grid } from 'react-flexbox-grid';
import _ from 'lodash';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import axios from 'axios';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import EventsListEntry from './EventsListEntry';
import { actions as userActions } from '../../redux/user';
import propSchema from '../common/PropTypes';

const Immutable = require('seamless-immutable').static;

BigCalendar.setLocalizer(
  BigCalendar.momentLocalizer(moment),
);

class EventsList extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      userEvents: [],
    };
    this.generateCalendarEvents = this.generateCalendarEvents.bind(this);
  }

  componentDidMount() {
    axios.get('/api/events/')
      .then(({ data }) => {
        this.setState({ events: data });
      });
    this.generateCalendarEvents(this.props.user);
  }

  componentWillReceiveProps(nextProps) {
    if (!_.isEqual(nextProps.user, this.props.user)) {
      this.generateCalendarEvents(nextProps.user);
    }
  }

  generateCalendarEvents(user) {
    if (user && user.events_attending) {
      const userEvents = user.events_attending.map(event => ({
        title: event.events.name,
        start: event.events.start,
        end: event.events.end,
      }));
      const mutableUserEvents = Immutable.asMutable(userEvents, { deep: true });
      this.setState({ userEvents: mutableUserEvents });
    }
  }

  render() {
    return (
      <Grid fluid>
        <div>
          <Link to={'/events/create'}>Create an event</Link><br />
        </div>
        <div>
          <BigCalendar
             // events={[{
             //   title: 'test event',
             //   start: moment(),
             //   end: moment().add(4, 'hours')
             // }]}
            // events={this.generateCalendarEvents()}
            events={this.state.userEvents}
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
  user: propSchema.user,
};

const mapStateToProps = state => ({
  user: state.user,
});

const mapDispatchToProps = dispatch => ({
  userActions: bindActionCreators(userActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(EventsList);
