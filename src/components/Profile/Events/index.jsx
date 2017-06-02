import moment from 'moment';
import React from 'react';
import { connect } from 'react-redux';
import CreateEventForm from './CreateEventForm';
import combineDates from './util';

class EventsMain extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newEventDate: moment(),
      newEventTimeStart: null,
      newEventTimeEnd: null,
    };

    this.selectDate = this.selectDate.bind(this);
    this.selectTimeStart = this.selectTimeStart.bind(this);
    this.selectTimeEnd = this.selectTimeEnd.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }

  selectDate(newEventDate) {
    this.setState({ newEventDate });
  }

  selectTimeStart(newEventTimeStart) {
    this.setState({ newEventTimeStart });
  }
  selectTimeEnd(newEventTimeEnd) {
    this.setState({ newEventTimeEnd });
  }

  submitForm(data) {
    const { newEventStart, newEventEnd } = combineDates(this.state.newEventDate,
      this.state.newEventTimeStart, this.state.newEventTimeEnd);
    console.log(data, newEventStart, newEventEnd);
  }

  render() {
    return (
      <CreateEventForm
        newEventDate={this.state.newEventDate}
        selectDate={this.selectDate}
        selectTimeStart={this.selectTimeStart}
        selectTimeEnd={this.selectTimeEnd}
        onSubmit={this.submitForm}
      />
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
});


export default connect(mapStateToProps)(EventsMain);
