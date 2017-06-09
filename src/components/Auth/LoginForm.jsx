import React from 'react';
import { Link } from 'react-router-dom';
import { Grid, Row, Col } from 'react-flexbox-grid';
import RaisedButton from 'material-ui/RaisedButton';
import { Field, reduxForm } from 'redux-form';
import propSchema from '../common/PropTypes';
import { renderField } from './formUtil';
import './auth.scss';

const LoginFormComponent = props => (
  <Grid fluid className="loginPopover">
    <form onSubmit={props.handleSubmit}>
      <Row>
        <Col>
          <Field
            name="email"
            type="text"
            component={renderField}
            label="E-Mail Address"
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <Field
            name="password"
            type="password"
            component={renderField}
            label="Password"
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
