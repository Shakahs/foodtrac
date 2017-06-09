import React from 'react';
import { Link } from 'react-router-dom';
import { Grid, Row, Col } from 'react-flexbox-grid';
import RaisedButton from 'material-ui/RaisedButton';
import { Field, reduxForm } from 'redux-form';
import propSchema from '../common/PropTypes';

// const Login = props => (
//   {/*<Link to="/login">*/}
//     {/*<FlatButton {...props} label="Login" />*/}
//   {/*</Link>*/}
// );

const LoginFormComponent = props => (
  <Grid fluid className="loginPopover">
    <form onSubmit={props.handleSubmit}>
      <Row>
        <Col >
          <label htmlFor="email">Email:</label>
        </Col>
        <Col xs={5} className="loginRight">
          <Field name="email" component="input" type="text" />
        </Col>
      </Row>
      <Row>
        <Col>
          <label htmlFor="password">Password:</label>
        </Col>
        <Col xs={5} className="loginRight">
          <Field name="password" component="input" type="text" />
        </Col>
      </Row>
      <Row around="xs">
        <Col>
          <RaisedButton label="Login" primary onClick={() => { props.handleSubmit(); }} />
        </Col>
        <Col>
          <Link to="/signup">
            <RaisedButton label="Sign up" secondary />
          </Link>
        </Col>
      </Row>
    </form>
  </Grid>
);

LoginFormComponent.propTypes = {
  handleSubmit: propSchema.handleSubmit,
};

const LoginForm = reduxForm({
  form: 'login', // a unique name for this form
})(LoginFormComponent);

export default LoginForm;
