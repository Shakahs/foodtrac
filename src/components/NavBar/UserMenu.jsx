import React from 'react';
import { connect } from 'react-redux';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import Drawer from 'material-ui/Drawer';
import PropTypes from 'prop-types';
import AuthorizedComponent from '../common/Helpers/AuthorizedComponent';
import UserEmblem from '../common/Emblem/UserEmblem';
import propSchema from '../common/PropTypes';
import { actions as authActions } from '../../redux/auth';

const UserMenu = props => (
  <Drawer
    open={props.menuOpen}
    className="MenuDrawer"
    docked={false}
    onRequestChange={props.handleMenuChange}
    width={300}
  >
    {/* <MenuItem onClick={props.handleMenuClose}>*/}
    {/* <SiteHeader handleMenuToggle={props.handleMenuToggle} />*/}
    {/* </MenuItem>*/}

    <AuthorizedComponent>
      <MenuItem>
        <UserEmblem user={props.user} />
      </MenuItem>
      <MenuItem
        containerElement={<Link to="/" />}
        primaryText="Dashboard"
        onClick={props.handleMenuClose}
      />
      {props.user.is_truck_owner &&
        props.user.brands.map(brand =>
          (<MenuItem
            key={brand.id}
            containerElement={<Link to={`/brand/${brand.id}/trucks`} />}
            primaryText={brand.name}
            onClick={props.handleMenuClose}
          />))}
      <MenuItem
        containerElement={<Link to="/settings" />}
        primaryText="Settings"
        onClick={props.handleMenuClose}
      />
    </AuthorizedComponent>
    <MenuItem
      containerElement={<Link to="/events" />}
      primaryText="Events"
      onClick={props.handleMenuClose}
    />
    <AuthorizedComponent>
      <Divider />
      <MenuItem
        containerElement={<Link to="/" />}
        primaryText="Sign out"
        onClick={() => {
          props.handleMenuClose();
          props.authActions.logout();
        }}
      />
    </AuthorizedComponent>
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
  isLoggedIn: state.auth.isLoggedIn,
});

const mapDispatchToProps = dispatch => ({
  authActions: bindActionCreators(authActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserMenu);
