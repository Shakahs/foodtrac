import React from 'react';
import { List, ListItem } from 'material-ui';
import { Link } from 'react-router-dom';

const SettingsSideBar = () => (
  <List>
    <Link to="/settings/addbrand">
      <ListItem primaryText="Add New Brand" />
    </Link>
  </List>
  );

export default SettingsSideBar;
