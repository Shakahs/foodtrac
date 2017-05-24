import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';

// const Login = props => (
//   {/*<Link to="/login">*/}
//     {/*<FlatButton {...props} label="Login" />*/}
//   {/*</Link>*/}
// );

const Login = props => (
  <Link to="/login">
    <form onSubmit={props.handleSubmit}>
      <div>
        <label htmlFor="userName">Username</label>
        <Field name="userName" component="input" type="text" />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <Field name="password" component="input" type="text" />
      </div>
      <button type="submit" onClick={() => { props.handleSubmit(); }}>Login</button>
    </form>
  </Link>
    );

Login.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};

const LoginForm = reduxForm({
  form: 'login', // a unique name for this form
})(Login);

export default LoginForm;
