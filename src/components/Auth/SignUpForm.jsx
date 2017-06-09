import React from 'react';
import PropTypes from 'prop-types';
import { Paper } from 'material-ui';
import { Checkbox } from 'redux-form-material-ui';
import { Grid, Row, Col } from 'react-flexbox-grid';
import { Field, reduxForm } from 'redux-form';
import RaisedButton from 'material-ui/RaisedButton';
import { renderField } from './formUtil';

const SignUpForm = (props) => {
  const { error, handleSubmit, pristine, reset, submitting } = props;  //eslint-disable-line
  return (
    <Paper zDepth={3}>
      <form onSubmit={props.handleSubmit}>
        <Grid fluid>
          <Row>
            <Col>
            Welcome to Foodtrac!
          </Col>
          </Row>
          <Row>
            <Col>
              <Field
                name="first_name"
                type="text"
                component={renderField}
                label="First Name"
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <Field
                name="last_name"
                type="text"
                component={renderField}
                label="Last Name"
              />
            </Col>
          </Row>
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
          <Row>
            <Col>
              <Field
                name="password2"
                type="password"
                component={renderField}
                label="Confirm Password"
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <Field
                name="isTruckOwner"
                // type="submit"
                component={Checkbox}
                label="Do you own a food truck?"
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <br /><br /><br />
              <Field
                name="submit"
                type="submit"
                component={RaisedButton}
                label="Create Account"
              />

              <RaisedButton
                label="Clear Fields"
                primary
                // eslint-disable-next-line
                onClick={props.reset} />
            </Col>
          </Row>
        </Grid>
      </form>
    </Paper>
  );
};


SignUpForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};

const ConnectedSignUpForm = reduxForm({
  form: 'SignUp', // a unique name for this form
  // onSubmit: RemoteSubmitButton,
})(SignUpForm);

export default ConnectedSignUpForm;
