import React from 'react';
import { Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import propSchema from '../common/PropTypes';

// const Login = props => (
//   {/*<Link to="/login">*/}
//     {/*<FlatButton {...props} label="Login" />*/}
//   {/*</Link>*/}
// );

const Login = props => (
  <Link to="/login">
    <form onSubmit={props.handleSubmit}>
      <div>
        <label htmlFor="email">Email</label>
        <Field name="email" component="input" type="text" />
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
  handleSubmit: propSchema.handleSubmit,
};

const LoginForm = reduxForm({
  form: 'login', // a unique name for this form
})(Login);

export default LoginForm;
