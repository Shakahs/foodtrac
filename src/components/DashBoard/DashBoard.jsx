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
        {this.props.user.user_rewards.length > 0
          ? <RewardsList rewards={this.props.user.user_rewards} />
          : null
        }
        {this.props.user.orders.length > 0
          ? <OrdersList orders={this.props.user.orders} />
          : null
        }
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
