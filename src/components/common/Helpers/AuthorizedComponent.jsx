import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import propSchema from '../PropTypes';

const AuthorizedComponent = props => (
  <div>
    {props.isLoggedIn && (!props.requireTruckOwner || (props.requireTruckOwner && props.user.is_truck_owner)) &&
      <div>{props.children}</div>
    }
  </div>
    );

AuthorizedComponent.propTypes = {
  children: PropTypes.element,
  isLoggedIn: PropTypes.bool.isRequired,
  requireTruckOwner: PropTypes.bool,
  user: propSchema.user,
};

const mapStateToProps = state => ({
  user: state.user,
  isLoggedIn: state.auth.isLoggedIn,
});

export default connect(mapStateToProps)(AuthorizedComponent);
