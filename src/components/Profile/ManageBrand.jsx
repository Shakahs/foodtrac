import React from 'react';
import { Field, reduxForm } from 'redux-form';
import RaisedButton from 'material-ui/RaisedButton';

const ManageBrand = () => (
  <div>
    <form>
      <div>Basic Information:</div>
      <div>
        <label htmlFor="brandName">Brand Name:</label>
        <Field name="brandName" component="input" type="text" />
      </div>
      <div>
        <label htmlFor="brandDescription">Brand Description:</label>
        <Field name="brandDescription" component="input" type="text" />
      </div>
      <div>
        <label htmlFor="foodGenre">Type of food:</label>
        <Field name="foodGenre" component="input" type="text" />
      </div>
      <RaisedButton label="Save Changes" />
    </form>
  </div>
);

const ManageBrandForm = reduxForm({
  form: 'manageBrand',
})(ManageBrand);

export default ManageBrandForm;
