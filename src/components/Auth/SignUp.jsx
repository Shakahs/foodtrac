import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Grid, Row, Col } from 'react-flexbox-grid';
import propSchema from '../common/PropTypes';
import SignUpForm from './SignUpForm';
import { actions as authActions } from '../../redux/auth';

const SignUp = props => (
  <Grid>
    <Row>
      <Col xs={12}>
        <Row center="xs">
          <SignUpForm onSubmit={props.authActions.accountCreate} />
        </Row>
      </Col>
    </Row>
  </Grid>
);

SignUp.propTypes = {
  authActions: propSchema.authActions,
};

const mapDispatchToProps = dispatch => ({
  authActions: bindActionCreators(authActions, dispatch),
});

export default connect(null, mapDispatchToProps)(SignUp);
