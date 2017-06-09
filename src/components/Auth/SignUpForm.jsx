import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { Checkbox, TextField } from 'redux-form-material-ui';

const SignUpForm = props => (
  <div>
    <form onSubmit={props.handleSubmit}>
      <div>
        <Field
          name="email"
          component={TextField}
          type="text"
          hintText="email"
          floatingLabelText="email"
        />
      </div>
      <div>
        <Field
          name="password"
          component={TextField}
          type="text"
          hintText="Password"
          floatingLabelText="Password"
        />
      </div>
      <div>
        <Field
          name="passwordRepeat"
          component={TextField}
          type="text"
          hintText="Re-enter Password"
          floatingLabelText="Re-enter Password"
        />
      </div>
      <div>
        <Field name="isTruckOwner" component={Checkbox} label="Do you own a Food Truck?" />
      </div>
      <button type="submit" onClick={() => { props.handleSubmit(); }}>Submit</button>
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
