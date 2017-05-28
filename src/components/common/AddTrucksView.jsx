import React from 'react';
import { TextField, FlatButton } from 'material-ui';
import propSchema from '../common/PropTypes';

const AddTrucksView = props => (
  <div>
    <TextField
      hintText="Truck Name"
      floatingLabelText={`Truck #${props.idx}`}
      onChange={props.handleChange}
      value={props.val}
      required
    />
    <FlatButton
      label="Remove"
      type="button"
      onClick={props.removeEntry}
    />
  </div>
);

AddTrucksView.propTypes = {
  handleChange: propSchema.handleChange,
  removeEntry: propSchema.removeEntry,
  val: propSchema.val,
  idx: propSchema.idx,
};

export default AddTrucksView;
