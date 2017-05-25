import React from 'react';
import PropTypes from 'prop-types';
import { TextField, FlatButton } from 'material-ui';

const AddTrucksView = props => (
  <div>
    <TextField
      hintText="Truck Name"
      onChange={props.handleChange}
      value={props.val}
    />
    <FlatButton
      label="Remove"
      type="button"
      onClick={props.removeEntry}
    />
  </div>
);

AddTrucksView.propTypes = {
  handleChange: PropTypes.func.isRequired,
  removeEntry: PropTypes.func.isRequired,
  val: PropTypes.string.isRequired,
};

export default AddTrucksView;
