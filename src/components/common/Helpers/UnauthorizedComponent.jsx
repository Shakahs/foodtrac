import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const UnauthorizedComponent = props => (
  <div>
    {!props.isLoggedIn ? (
      <div>{props.children}</div>
    ) : '' }
  </div>
);

UnauthorizedComponent.propTypes = {
  children: PropTypes.element,
  isLoggedIn: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  isLoggedIn: state.auth.isLoggedIn,
});

export default connect(mapStateToProps)(UnauthorizedComponent);
