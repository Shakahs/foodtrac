import React from 'react';
import { Tabs, Tab } from 'material-ui';
import propSchema from '../common/PropTypes';
import ManageBasic from './ManageBasic';
import ManageTrucks from './ManageTrucks';

const ManageBrand = props => (
  <Tabs>
    <Tab label="Change Basic Brand Info">
      <ManageBasic brandId={props.brandId} />
    </Tab>
    <Tab label="Manage Your Trucks">
      <ManageTrucks brandId={props.brandId} trucks={props.trucks} />
    </Tab>
  </Tabs>
);

ManageBrand.propTypes = {
  trucks: propSchema.trucks,
  brandId: propSchema.brandId,
};

export default ManageBrand;
