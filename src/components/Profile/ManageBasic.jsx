import React from 'react';

import { Link } from 'react-router-dom';
import { MenuItem, RaisedButton } from 'material-ui';

import { SelectField, TextField } from 'redux-form-material-ui';
import { Field, reduxForm } from 'redux-form';

import propSchema from '../common/PropTypes';


const ManageBasic = props => (
  <div>
    <Field
      name="name"
      component={TextField}
      type="text"
      hintText="Change Brand Name"
      floatingLabelText="Change Brand Name"
    />
    <br />
    <Field
      name="description"
      component={TextField}
      type="text"
      hintText="Change Brand Description"
      floatingLabelText="Change Brand Description"
    />
    <br />
    <Field
      name="food_genre_id"
      component={SelectField}
      hintText="Change Food Genre"
      floatingLabelText="Change Food Genre"
    >
      <MenuItem value="{0}" />
      {props.foodGenres.map(genre =>
        <MenuItem key={genre.id} value={genre.id} primaryText={genre.name} />,
      )}
    </Field>
    <br />
    <br />
    <Link to={`/brand/${props.brandId}/trucks`}>
      <RaisedButton
        label="Save Changes"
        onClick={props.handleSubmit}
      />
    </Link>
  </div>
);

ManageBasic.propTypes = {
  brandId: propSchema.brandId,
  foodGenres: propSchema.foodGenres,
  handleSubmit: propSchema.handleSubmit,
};

export default reduxForm({
  form: 'SignUp', // a unique name for this form
})(ManageBasic);

