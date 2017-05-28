import React from 'react';
import { Tabs, Tab } from 'material-ui';
import propSchema from '../common/PropTypes';
import ManageBasic from './ManageBasic';
import ManageTrucks from './ManageTrucks';

const ManageBrand = props => (
  <Tabs>
    <Tab label="Change Basic Brand Info">
      <ManageBasic
        brandId={props.brandId}
        getBrand={props.getBrand}
      />
    </Tab>
    <Tab label="Manage Your Trucks">
      <ManageTrucks
        brandId={props.brandId}
        trucks={props.trucks}
        getBrand={props.getBrand}
      />
    </Tab>
  </Tabs>
);

ManageBrand.propTypes = {
  trucks: propSchema.trucks,
  brandId: propSchema.brandId,
  getBrand: propSchema.getBrand,
};

export default ManageBrand;
