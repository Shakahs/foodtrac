import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { TextField } from 'redux-form-material-ui';


const ReviewEntry = props => (
  <div>
    <form onSubmit={props.handleSubmit}>
      <div>
        <Field
          name="reviewTitle"
          component={TextField}
          type="text"
          hintText="Title of your Review"
          floatingLabelText="Title of your Review"
        />
      </div>
      <div>
        <Field
          name="reviewText"
          component={TextField}
          type="text"
          hintText="Write your review"
          floatingLabelText="Write your review"
          fullWidth="true"
          rows="5"
        />
      </div>

      <button type="submit" onClick={props.handleSubmit}>Submit</button>
    </form>
  </div>
);

ReviewEntry.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};

export default reduxForm({
  form: 'ReviewEntry',
})(ReviewEntry);
