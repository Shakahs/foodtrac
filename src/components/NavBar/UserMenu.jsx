import React from 'react';
import { connect } from 'react-redux';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import Drawer from 'material-ui/Drawer';
import PropTypes from 'prop-types';
import UserEmblem from '../common/Emblem/UserEmblem';
import propSchema from '../common/PropTypes';
import { actions as authActions } from '../../redux/auth';
import AuthorizedComponent from '../common/Helpers/AuthorizedComponent';

const UserMenu = props => (
  <Drawer
    open={props.menuOpen}
    className="MenuDrawer"
    docked={false}
    onRequestChange={props.handleMenuChange}
    width={300}
  >
    {/* <MenuItem onTouchTap={props.handleMenuClose}>*/}
    {/* <SiteHeader handleMenuToggle={props.handleMenuToggle} />*/}
    {/* </MenuItem>*/}

    <AuthorizedComponent>
      <MenuItem>
        <UserEmblem user={props.user} />
      </MenuItem>
    </AuthorizedComponent>

    <MenuItem
      containerElement={<Link to="/" />}
      primaryText="Dashboard"
      onTouchTap={props.handleMenuClose}
    />
    <AuthorizedComponent requireTruckOwner>
      { props.user.brands.map(brand =>
        (<MenuItem
          key={brand.id}
          containerElement={<Link to={`/brand/${brand.id}/trucks`} />}
          primaryText={brand.name}
          onTouchTap={props.handleMenuClose}
        />),
      )}
    </AuthorizedComponent>

    <AuthorizedComponent>
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
