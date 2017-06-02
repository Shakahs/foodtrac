import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { TextField } from 'redux-form-material-ui';
import DatePicker from 'react-datepicker';
import TimePicker from 'rc-time-picker';
import 'react-datepicker/dist/react-datepicker.css';
import 'rc-time-picker/assets/index.css';


const CreateEventForm = props => (
  <div>
    <form onSubmit={props.handleSubmit}>
      <div>
        When is your event?
        <DatePicker
          selected={props.newEventDate}
          onChange={props.selectDate}
        />
        Start:<TimePicker
          onChange={props.selectTimeStart}
          use12Hours
        />
        End: <TimePicker
          onChange={props.selectTimeEnd}
          use12Hours
        />
      </div>
      <div>
        <Field
          name="name"
          component={TextField}
          type="text"
          hintText="Title of your Event"
          floatingLabelText="Title of your Event"
        />
      </div>
      <div>
        <Field
          name="description"
          component={TextField}
          type="text"
          hintText="Description of your event"
          floatingLabelText="Description of your event"
          fullWidth="true"
          rows="5"
          rowsMax="5"
          multiLine
        />
      </div>
      <button type="submit" >Submit</button>
    </form>
  </div>
);

CreateEventForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  newEventDate: PropTypes.func.isRequired,
  selectTimeEnd: PropTypes.func.isRequired,
  selectTimeStart: PropTypes.func.isRequired,
  selectDate: PropTypes.func.isRequired,
};

export default reduxForm({
  form: 'CreateEventForm',
})(CreateEventForm);
