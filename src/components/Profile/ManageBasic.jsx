import React, { Component } from 'react';
import { MenuItem, RaisedButton, FlatButton } from 'material-ui';
import { SelectField, TextField } from 'redux-form-material-ui';
import { Field, reduxForm } from 'redux-form';
import propSchema from '../common/PropTypes';
import UploadDropzone from './UploadDropzone';


class ManageBasic extends Component {
  constructor() {
    super();
    this.state = {
      coverDropzone: false,
      logoDropzone: false,
    };
    this.toggleCoverDropzone = this.toggleCoverDropzone.bind(this);
    this.toggleLogoDropzone = this.toggleLogoDropzone.bind(this);
  }

  toggleCoverDropzone() {
    this.setState({ coverDropzone: !this.state.coverDropzone });
  }

  toggleLogoDropzone() {
    this.setState({ logoDropzone: !this.state.logoDropzone });
  }

  render() {
    return (
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
          {this.props.foodGenres.map(genre =>
            <MenuItem key={genre.id} value={genre.id} primaryText={genre.name} />,
          )}
        </Field>
        <br />
        <br />
        <FlatButton
          label="Add a cover picture"
          onClick={this.toggleCoverDropzone}
        />
        {this.state.coverDropzone
          ? <UploadDropzone />
          : null
        }
        <br />
        <FlatButton
          label="Add a logo"
          onClick={this.toggleLogoDropzone}
        />
        {this.state.logoDropzone
          ? <UploadDropzone />
          : null
        }
        <br />
        <br />
        <RaisedButton
          label="Save Changes"
          onClick={this.props.handleSubmit}
        />
      </div>
    );
  }
}

ManageBasic.propTypes = {
  foodGenres: propSchema.foodGenres,
  handleSubmit: propSchema.handleSubmit,
};

export default reduxForm({
  form: 'SignUp', // a unique name for this form
})(ManageBasic);

