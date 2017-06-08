import React from 'react';
import { Paper } from 'material-ui';
import propSchema from '../common/PropTypes';

const DashEntry = props => (
  <Paper zDepth={4} className="dash-section">
    {props.children}
  </Paper>
);

DashEntry.propTypes = {
  children: propSchema.children,
};

export default DashEntry;
