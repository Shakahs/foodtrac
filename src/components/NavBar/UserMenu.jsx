import React from 'react';
import { connect } from 'react-redux';
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
    <MenuItem containerElement={<Link to="/" />} primaryText="Dashboard" />
    {props.user.is_truck_owner ?
      props.user.brands.map(brand =>
        <MenuItem key={brand.id} containerElement={<Link to={`/brand/${brand.id}/trucks`} />} primaryText={brand.name} />,
      ) : null
    }
    <MenuItem containerElement={<Link to="/settings" />} primaryText="Settings" />
    <Divider />
    <MenuItem
      containerElement={<Link to="/" />}
      primaryText="Sign out"
      onClick={() => { props.handleLogout(); }}
    />
  </IconMenu>
);

UserMenu.propTypes = {
  handleLogout: propSchema.handleLogout,
  user: propSchema.user,
};

const mapStateToProps = ({ user }) => ({
  user,
});

export default connect(mapStateToProps, null)(UserMenu);
