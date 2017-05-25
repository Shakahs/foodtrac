import React from 'react';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import { Link } from 'react-router-dom';
import propSchema from '../common/PropTypes';

const UserMenu = props => (
  <IconMenu
    iconButtonElement={
      <IconButton><MoreVertIcon /></IconButton>
    }
    targetOrigin={{ horizontal: 'right', vertical: 'top' }}
    anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
  >
    <Link to="/">
      <MenuItem primaryText="Dashboard" />
    </Link>
    <Link to={'/brand/1/trucks'}>
      <MenuItem primaryText="Profile" />
    </Link>
    <Link to="/settings">
      <MenuItem primaryText="Settings" />
    </Link>
    <Divider />
    <Link to="/">
      <MenuItem primaryText="Sign out" onClick={() => { props.handleLogout(); }} />
    </Link>
  </IconMenu>
);

UserMenu.propTypes = {
  handleLogout: propSchema.handleLogout,
};

export default UserMenu;
