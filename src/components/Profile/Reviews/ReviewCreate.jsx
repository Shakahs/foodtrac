import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { TextField } from 'redux-form-material-ui';
import StarRatingComponent from 'react-star-rating-component';

const ReviewEntry = props => (
  <div>
    <form onSubmit={props.handleSubmit}>
      <div>
        <StarRatingComponent
          name="rating"
          value={5}
          onStarClick={props.updateReviewScore}
        />
      </div>
      <div>
        <Field
          name="title"
          component={TextField}
          type="text"
          hintText="Title of your Review"
          floatingLabelText="Title of your Review"
        />
      </div>
      <div>
        <Field
          name="text"
          component={TextField}
          type="text"
          hintText="Write your review"
          floatingLabelText="Write your review"
          fullWidth="true"
          rows="5"
          rowsMax="5"
          multiLine
        />
      </div>
      <button type="submit" onClick={props.handleSubmit}>Submit</button>
    </form>
  </div>
);

ReviewEntry.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  updateReviewScore: PropTypes.func.isRequired,
};

export default reduxForm({
  form: 'ReviewEntry',
})(ReviewEntry);
