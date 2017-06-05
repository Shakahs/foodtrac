import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { TextField } from 'redux-form-material-ui';
import RaisedButton from 'material-ui/RaisedButton';
import propSchema from '../PropTypes';

const CommentsInput = props => (
  <form onSubmit={props.handleSubmit}>
    <Field
      name={props.name}
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
  </form>
);

CommentsInput.propTypes = {
  name: propSchema.name,
  handleSubmit: propSchema.handleSubmit,
};

export default reduxForm({ form: 'comment' })(CommentsInput);
