import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import RewardsList from './RewardsList';
import FollowedList from './FollowedList';
import EventsList from './EventsList';
import OrdersList from './OrdersList';
import propSchema from '../common/PropTypes';

class DashBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <FollowedList brands={this.props.user.user_follows} />
        <EventsList events={_.map(this.props.user.events_attending, eventJoin => eventJoin.events)} />
        {this.props.user.user_rewards && this.props.user.user_rewards.length > 0
          ? <RewardsList rewards={this.props.user.user_rewards} />
          : null
        }
        {this.props.user.orders && this.props.user.orders.length > 0
          ? <OrdersList orders={this.props.user.orders} />
          : null
        }
      </div>
    );
  }
}

const mapStateToProps = ({ user }) => ({ user });

DashBoard.propTypes = {
  user: propSchema.user,
};

export default connect(mapStateToProps)(DashBoard);
