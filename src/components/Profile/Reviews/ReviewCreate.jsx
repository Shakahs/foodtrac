import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { TextField } from 'redux-form-material-ui';


const ReviewEntry = props => (
  <div>
    <form onSubmit={props.onSubmit}>
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

      <button type="submit" onClick={() => { props.onSubmit(); }}>Submit</button>
    </form>
  </div>
);

ReviewEntry.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default reduxForm({
  form: 'ReviewEntry',
})(ReviewEntry);
