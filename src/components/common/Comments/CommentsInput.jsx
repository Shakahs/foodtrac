import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { TextField } from 'redux-form-material-ui';
import RaisedButton from 'material-ui/RaisedButton';
import PropTypes from 'prop-types';
import propSchema from '../PropTypes';

const CommentsInput = props => (
  <form onSubmit={props.handleSubmit}>
    <Field
      name="text"
      component={TextField}
      type="text"
      hintText="Leave a comment!"
      floatingLabelText="Leave a comment!"
      fullWidth
      multiLine
      rows={3}
      rowsMax={4}
      required
    />
    <RaisedButton type="submit" primary label="Submit" />
    {props.children}
  </form>
);

CommentsInput.propTypes = {
  handleSubmit: propSchema.handleSubmit,
  children: PropTypes.element,
};

export default reduxForm({ form: 'comment' })(CommentsInput);
