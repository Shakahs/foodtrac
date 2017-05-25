import React from 'react';
import { connect } from 'react-redux';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

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
    {props.user.is_truck_owner ?
      props.user.brands.map(brand =>
        (<Link key={brand.id} to={`/brand/${brand.id}/trucks`}>
          <MenuItem primaryText={brand.name} />
        </Link>),
      ) : null
    }
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
  handleLogout: PropTypes.func.isRequired,
  user: PropTypes.shape({
    email: PropTypes.string,
    is_truck_owner: PropTypes.boolean,
    userId: PropTypes.number,
    brands: PropTypes.array,
  }).isRequired,
};

const mapStateToProps = ({ user }) => ({
  user,
});

export default connect(mapStateToProps, null)(UserMenu);
