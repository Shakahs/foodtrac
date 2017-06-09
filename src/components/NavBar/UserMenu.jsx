import React from 'react';
import { connect } from 'react-redux';
import { MenuItem, Divider, Drawer, FontIcon } from 'material-ui';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import 'font-awesome/css/font-awesome.min.css';
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
        primaryText={<span><FontIcon className="fa fa-home" /> Dashboard</span>}
        onClick={props.handleMenuClose}
      />
      {props.user.is_truck_owner &&
        props.user.brands.map(brand =>
          (<MenuItem
            key={brand.id}
            containerElement={<Link to={`/brand/${brand.id}/trucks`} />}
            primaryText={<span><FontIcon className="fa fa-truck" /> {brand.name}</span>}
            onClick={props.handleMenuClose}
          />))}
      <MenuItem
        containerElement={<Link to="/settings" />}
        primaryText={<span><FontIcon className="fa fa-cog" /> Settings</span>}
        onClick={props.handleMenuClose}
      />
    </AuthorizedComponent>
    <MenuItem
      containerElement={<Link to="/events" />}
      primaryText={<span><FontIcon className="fa fa-calendar" /> Events</span>}
      onClick={props.handleMenuClose}
    />
    <AuthorizedComponent>
      <Divider />
      <MenuItem
        containerElement={<Link to="/" />}
        primaryText={<span><FontIcon className="fa fa-sign-out" /> Sign Out</span>}
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
