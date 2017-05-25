import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';

const SignUpForm = props => (
  <div>
    <form onSubmit={props.handleSubmit}>
      <div>
        <label htmlFor="userName">Username</label>
        <Field name="userName" component="input" type="text" />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <Field name="password" component="input" type="text" />
      </div>
      <div>
        <label htmlFor="passwordRepeat">Re-enter Password</label>
        <Field name="passwordRepeat" component="input" type="text" />
      </div>
      <div>
        <label htmlFor="isTruckOwner">Do you own a food truck?</label>
        <Field name="isTruckOwner" component="input" type="checkbox" />
      </div>
      <button type="submit" onClick={() => { props.handleSubmit(); }}>Login</button>
    </form>
  </div>
);

SignUpForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};

const ConnectedSignUpForm = reduxForm({
  form: 'SignUp', // a unique name for this form
})(SignUpForm);

export default ConnectedSignUpForm;
