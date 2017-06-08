import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import RewardsList from './RewardsList';
import FollowedList from './FollowedList';
import EventsList from './EventsList';
import OrdersList from './OrdersList';
import propSchema from '../common/PropTypes';
import './DashBoard.scss';

class DashBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div id="dashboard">
        <FollowedList brands={this.props.user.user_follows} />
        <EventsList events={_.map(this.props.user.events_attending, eventJoin => eventJoin.events)} />
        <RewardsList rewards={this.props.user.user_rewards} />
        <OrdersList orders={this.props.user.orders} />
      </div>
    );
  }
}

const mapStateToProps = ({ user }) => ({ user });

DashBoard.propTypes = {
  user: propSchema.user,
};

export default connect(mapStateToProps)(DashBoard);
