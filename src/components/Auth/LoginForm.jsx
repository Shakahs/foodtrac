import React from 'react';
import { Link } from 'react-router-dom';
import { Grid, Row, Col } from 'react-flexbox-grid';
import RaisedButton from 'material-ui/RaisedButton';
import { Field, reduxForm } from 'redux-form';
import propSchema from '../common/PropTypes';
import { renderField } from './formUtil';
import './auth.scss';

const LoginFormComponent = (props) => {
  const {error, handleSubmit, pristine, reset, submitting} = props;  //eslint-disable-line
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
            <Field
              name="submit"
              type="submit"
              component={RaisedButton}
              label="Login"
            />
          </Col>
          <Col>
            <Link to="/signup">
              <RaisedButton label="Sign up" secondary />
            </Link>
          </Col>
        </Row>
        <Row around="xs">
          <Col>
            {error && <strong>{error}</strong>}
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
