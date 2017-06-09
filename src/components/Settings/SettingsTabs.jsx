import React from 'react';
import { Col } from 'react-flexbox-grid';
import { Tabs, Tab } from 'material-ui';
import { withRouter } from 'react-router-dom';
import propSchema from '../common/PropTypes';

const onTabChange = (val, history) => history.push(val);

const SettingsTabs = props => (
  <Col xs={12}>
    <Tabs onChange={val => onTabChange(val, props.history)}>
      {props.is_truck_owner
        ? <Tab value="/settings/addbrand" label="Add New Brand" />
        : <Tab value="/settings/becomeOwner" label="Become a Brand Owner" />}
      <Tab value="/settings/notifications" label="Notifications" />
    </Tabs>
  </Col>
);

SettingsTabs.propTypes = {
  is_truck_owner: propSchema.is_truck_owner,
  history: propSchema.history,
};

export default withRouter(SettingsTabs);
