import React from 'react';
import { Link } from 'react-router-dom';
import { Grid } from 'react-flexbox-grid';
import _ from 'lodash';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import axios from 'axios';
import EventsListEntry from './EventsListEntry';
import { actions as userActions } from '../../redux/user';

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
        {this.state.events.length > 0 ?
            _.map(this.state.events, event => <EventsListEntry event={event} />)
            :
            <div className="noItems">This truck is not attending any events</div>
          }
      </Grid>
    );
  }
}

EventsList.propTypes = {

};

const mapStateToProps = state => ({
  user: state.user,
});

const mapDispatchToProps = dispatch => ({
  userActions: bindActionCreators(userActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(EventsList);
