import React from 'react';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const UserMenu = props => (
  <IconMenu
    {...props}
    iconButtonElement={
      <IconButton><MoreVertIcon /></IconButton>
    }
    targetOrigin={{ horizontal: 'right', vertical: 'top' }}
    anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
  >
    <Link to="/">
      <MenuItem primaryText="Dashboard" />
    </Link>
    <Link to="/profile/menu">
      <MenuItem primaryText="Profile" />
    </Link>
    <Link to="/settings">
      <MenuItem primaryText="Settings" />
    </Link>
    <Link to="/">
      <MenuItem primaryText="Sign out" onClick={() => props.handleLogin()} />
    </Link>
  </IconMenu>
);

UserMenu.propTypes = {
  handleLogin: PropTypes.func.isRequired,
};

export default UserMenu;
