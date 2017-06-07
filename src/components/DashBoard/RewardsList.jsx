import React from 'react';
import { Card, CardTitle } from 'material-ui';
import propSchema from '../common/PropTypes';
import RewardEntry from './RewardEntry';

const RewardsList = props => (
  <Card>
    <CardTitle title="Your Rewards and Coupons" />
    {props.rewards.map(reward =>
      <RewardEntry reward={reward} />,
    )}
  </Card>
);

RewardsList.propTypes = {
  rewards: propSchema.rewards,
};

export default RewardsList;
