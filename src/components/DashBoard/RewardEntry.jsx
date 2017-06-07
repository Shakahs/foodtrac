import React from 'react';
import { Paper } from 'material-ui';
import propSchema from '../common/PropTypes';
import CouponEntry from './CouponEntry';

const RewardEntry = props => (
  <Paper>
    <div>{props.reward.brands.name}</div>
    <div>{`Only ${props.reward.brands.rewards_trigger - props.reward.count} more orders from ${props.reward.brands.name} before you get a new coupon!`}</div>
    {props.reward.user_coupons.map(coupon =>
      <CouponEntry coupon={coupon} />,
    )}
  </Paper>
);

RewardEntry.propTypes = {
  reward: propSchema.reward,
};

export default RewardEntry;
