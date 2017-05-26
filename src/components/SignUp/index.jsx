import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import SignUpForm from './SignUpForm';
import { actions as authActions } from '../../redux/auth';

const SignUp = props => (
  <div>
    Thanks for signing up!
    <SignUpForm onSubmit={props.authActions.createAccount} />
  </div>
);

SignUp.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  authActions: bindActionCreators(authActions, dispatch),
});

export default connect(null, mapDispatchToProps)(SignUp);
