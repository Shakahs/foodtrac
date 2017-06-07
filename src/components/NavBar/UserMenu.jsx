import React from 'react';
import { connect } from 'react-redux';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import Drawer from 'material-ui/Drawer';
import PropTypes from 'prop-types';
import propSchema from '../common/PropTypes';
import { actions as authActions } from '../../redux/auth';

const UserMenu = props => (
  <Drawer
    open={props.menuOpen}
    className="MenuDrawer"
    docked={false}
    onRequestChange={props.handleMenuChange}
  >
    {/* <MenuItem onTouchTap={props.handleMenuClose}>*/}
    {/* <SiteHeader handleMenuToggle={props.handleMenuToggle} />*/}
    {/* </MenuItem>*/}
    <MenuItem
      containerElement={<Link to="/" />}
      primaryText="Dashboard"
      onTouchTap={props.handleMenuClose}
    />
    {props.user.is_truck_owner ?
      props.user.brands.map(brand =>
        (<MenuItem
          key={brand.id}
          containerElement={<Link to={`/brand/${brand.id}/trucks`} />}
          primaryText={brand.name}
          onTouchTap={props.handleMenuClose}
        />),
      ) : null
    }
    <MenuItem
      containerElement={<Link to="/settings" />}
      primaryText="Settings"
      onTouchTap={props.handleMenuClose}
    />
    <Divider />
    <MenuItem
      containerElement={<Link to="/" />}
      primaryText="Sign out"
      onTouchTap={() => {
        props.handleMenuClose();
        props.authActions.logout();
      }}
    />
  </Drawer>
);

UserMenu.propTypes = {
  handleMenuClose: PropTypes.func.isRequired,
  handleMenuChange: PropTypes.func.isRequired,
  authActions: propSchema.authActions,
  user: propSchema.user,
  menuOpen: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  user: state.user,
  // isLoggedIn: state.auth.isLoggedIn,
});

const mapDispatchToProps = dispatch => ({
  authActions: bindActionCreators(authActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserMenu);
