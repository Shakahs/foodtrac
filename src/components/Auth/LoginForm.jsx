import React from 'react';
import { Link } from 'react-router-dom';
import { Grid, Row, Col } from 'react-flexbox-grid';
import RaisedButton from 'material-ui/RaisedButton';
import { Field, reduxForm } from 'redux-form';
import propSchema from '../common/PropTypes';

const renderField = ({ input, label, type }) => ( // eslint-disable-line react/prop-types
  <div>
    <input {...input} placeholder={label} type={type} className="loginFields" />
  </div>
);

const LoginFormComponent = props => (
  <Grid fluid className="loginPopover">
    <form onSubmit={props.handleSubmit}>
      <Row>
        <Col xs={4}>
          <label htmlFor="email">Email:</label>
        </Col>
        <Col xs={8}>
          <Field name="email" component="input" type="text" className="loginFields" />
        </Col>
      </Row>
      <Row>
        <Col xs={4}>
          <label htmlFor="password">Password:</label>
        </Col>
        <Col xs={8} >
          <Field
            name="password"
            type="password"
            component={renderField}
            label="Password"
            className="loginFields"
          />
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
