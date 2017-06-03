import React from 'react';
import { Col } from 'react-flexbox-grid';
import { List, ListItem, Card, Subheader } from 'material-ui';
import { Link } from 'react-router-dom';
import propSchema from '../common/PropTypes';

const sidebarStyle = {
  display: 'inline-block',
  height: '80%',
  width: '100%',
};

const SettingsSideBar = props => (
  <Col xs={12} sm={12} md={2} lg={2}>
    <Card style={sidebarStyle}>
      <List>
        <Subheader>Settings</Subheader>
        {props.is_truck_owner
          ? <Link to="/settings/addbrand">
            <ListItem primaryText="Add New Brand" />
          </Link>
          : <Link to="/settings/becomeOwner">
            <ListItem primaryText="Become a Brand Owner" />
          </Link>}
      </List>
    </Card>
  </Col>
);

SettingsSideBar.propTypes = {
  is_truck_owner: propSchema.is_truck_owner,
};

export default SettingsSideBar;
