import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import SignUpForm from './SignUpForm';

const SignUp = props => (
  <div>
    Thanks for signing up!
    <SignUpForm onSubmit={(newuser) => { console.log(newuser); }} />
  </div>
);

SignUp.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({

});


const mapDispatchToProps = dispatch => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
