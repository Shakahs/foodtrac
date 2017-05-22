import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import { Link } from 'react-router-dom';

const Login = props => (
  <Link to="/login">
    <FlatButton {...props} label="Login" />
  </Link>
);

export default Login;
