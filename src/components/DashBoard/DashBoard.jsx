import React, { Component } from 'react';
import CouponsList from './CouponsList';
import RewardsList from './RewardsList';
import FollowedList from './FollowedList';
import EventsList from './EventsList';
import FeedList from './FeedList';

class DashBoard extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <div>
        <CouponsList />
        <RewardsList />
        <FollowedList />
        <EventsList />
        <FeedList />
      </div>
    );
  }
}

export default DashBoard;
