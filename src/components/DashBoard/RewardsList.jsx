import React from 'react';
import { CardTitle } from 'material-ui';
import { Grid, Row } from 'react-flexbox-grid';
import propSchema from '../common/PropTypes';
import RewardEntry from './RewardEntry';
import DashEntry from './DashEntry';

const RewardsList = props => (
  <DashEntry>
    <CardTitle
      title="Your Rewards and Coupons"
    />
    <Grid fluid>
      <Row>
        {props.rewards && props.rewards.length > 0
      ? props.rewards.map(reward => <RewardEntry reward={reward} />)
      : <h2>You have not started any rewards programs yet.</h2>}
      </Row>
    </Grid>
  </DashEntry>
);

RewardsList.propTypes = {
  rewards: propSchema.rewards,
};

export default RewardsList;
