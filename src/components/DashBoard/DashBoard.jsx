import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import CouponsList from './CouponsList';
import RewardsList from './RewardsList';
import FollowedList from './FollowedList';
import EventsList from './EventsList';
// import FeedList from './FeedList';
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
        <CouponsList />
        <RewardsList />
      </div>
    );
  }
}

const mapStateToProps = ({ user }) => ({ user });

DashBoard.propTypes = {
  user: propSchema.user,
};

export default connect(mapStateToProps)(DashBoard);
