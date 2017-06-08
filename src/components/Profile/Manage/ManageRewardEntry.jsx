import React from 'react';
import { Link } from 'react-router-dom';
import { TextField, SelectField, MenuItem, FlatButton } from 'material-ui';
import propSchema from '../../common/PropTypes';

const ManageRewardEntry = props => (
  <div>
    <br />
    <br />
    <div>Set your reward program limit:</div>
    <SelectField
      floatingLabelText="Reward limit"
      value={props.trigger}
      onChange={(e, i, val) => props.setValues(val, 'trigger')}
    >
      <MenuItem value={5} primaryText="5" />
      <MenuItem value={10} primaryText="10" />
      <MenuItem value={15} primaryText="15" />
      <MenuItem value={20} primaryText="20" />
    </SelectField>
    <br />
    <br />
    <div>Set your type of coupon:</div>
    <SelectField
      floatingLabelText="Type of Discount"
      value={props.type}
      onChange={props.setType}
    >
      <MenuItem value={1} primaryText="Flat" />
      <MenuItem value={2} primaryText="Percent" />
    </SelectField>
    <br />
    {props.type === 1
      ? <TextField
        key={1}
        floatingLabelText="set flat discount rate"
        hintText="flat rate"
        type="number"
        value={props.flatRate}
        onChange={(e, val) => props.setValues(val, 'flatRate')}
      />
      : <SelectField
        key={2}
        floatingLabelText="set percent discount rate"
        value={props.percentRate}
        onChange={(e, i, val) => props.setValues(val, 'percentRate')}
      >
        <MenuItem value={5} primaryText="5%" />
        <MenuItem value={10} primaryText="10%" />
        <MenuItem value={15} primaryText="15%" />
        <MenuItem value={20} primaryText="20%" />
        <MenuItem value={25} primaryText="25%" />
        <MenuItem value={30} primaryText="30%" />
        <MenuItem value={35} primaryText="35%" />
      </SelectField>
    }
    <br />
    <br />
    <Link to={`/brand/${props.brandId}/trucks`}>
      <FlatButton
        label="Save Changes"
        onClick={props.saveChanges}
      />
    </Link>
  </div>
);

ManageRewardEntry.propTypes = {
  setValues: propSchema.setValues,
  setType: propSchema.setType,
  trigger: propSchema.trigger,
  type: propSchema.type,
  flatRate: propSchema.flatRate,
  percentRate: propSchema.percentRate,
  saveChanges: propSchema.saveChanges,
  brandId: propSchema.brandId,
};

export default ManageRewardEntry;
