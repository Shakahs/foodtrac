import React from 'react';
import { Link } from 'react-router-dom';
import { Grid, Row, Col } from 'react-flexbox-grid';
import RaisedButton from 'material-ui/RaisedButton';
import { Field, reduxForm } from 'redux-form';
import 'hint.css';
import propSchema from '../common/PropTypes';
import { renderField } from './formUtil';
import './auth.scss';

const classNames = require('classnames');

const LoginFormComponent = (props) => {
  const {error, handleSubmit, pristine, reset, submitting} = props;  //eslint-disable-line
  const loginButtonClass = classNames({
    'hint--always': error,
    'hint--error': error,
    'hint--bottom': error,
    'hint--rounded': error,
    'hint--bounce': error,
  });
  return (
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
            <br /><br />
          </Col>
        </Row>
        <Row around="xs">
          <Col>
            <div
              className={loginButtonClass}
              data-hint={error}
            >
              <Field
                name="submit"
                type="submit"
                component={RaisedButton}
                label="Login"
              />
            </div>
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
};

LoginFormComponent.propTypes = {
  handleSubmit: propSchema.handleSubmit,
};

const LoginForm = reduxForm({
  form: 'Login', // a unique name for this form
})(LoginFormComponent);

export default LoginForm;
