import React, { Component } from 'react';
import { connect } from 'react-redux';
import propSchema from '../common/PropTypes';
import RewardsList from './RewardsList';
import FollowedList from './FollowedList';
import EventsList from './EventsList';
import FeedList from './FeedList';
import OrdersList from './OrdersList';

class DashBoard extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <div>
        <RewardsList rewards={this.props.user.user_rewards} />
        <OrdersList orders={this.props.user.orders} />
        <FollowedList />
        <EventsList />
        <FeedList />
      </div>
    );
  }
}

DashBoard.propTypes = {
  user: propSchema.user,
};

const mapStateToProps = ({ user }) => ({ user });

export default connect(mapStateToProps)(DashBoard);
