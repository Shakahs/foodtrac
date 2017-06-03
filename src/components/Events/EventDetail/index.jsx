import React from 'react';
import { connect } from 'react-refetch';
import { Grid, Row, Col } from 'react-flexbox-grid';
import PropTypes from 'prop-types';
import { withGoogleMap, GoogleMap } from 'react-google-maps';
import Paper from 'material-ui/Paper';
import _ from 'lodash';
import { RaisedButton } from 'material-ui';
import UserAttendeesList from './UserAttendeesList';
import BrandAttendeesList from './BrandAttendeesList';
import { eventAPI } from '../../../api';
import propSchema from '../../common/PropTypes';


class EventDetail extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);

    this.UserRegisterButton = this.UserRegisterButton.bind(this);
    this.UserUnregisterButton = this.UserUnregisterButton.bind(this);
    this.UserToggleRegistrationButton = this.UserToggleRegistrationButton.bind(this);
    this.BrandRegisterButton = this.BrandRegisterButton.bind(this);
    this.BrandUnregisterButton = this.BrandUnregisterButton.bind(this);
    this.BrandToggleRegistrationButton = this.BrandToggleRegistrationButton.bind(this);
  }

  UserRegisterButton() {
    return (<RaisedButton
      label="Attend this event"
      onTouchTap={() => eventAPI.userRegisterAttendEvent(this.props.eventId, this.props.user.id)
          .then(() => { this.props.refreshEvent(); })
          .catch(() => { this.props.refreshEvent(); })}
    />);
  }

  UserUnregisterButton() {
    return (<RaisedButton
      label="Do not attend this event"
      onTouchTap={() => eventAPI.userUnregisterAttendEvent(this.props.eventId, this.props.user.id)
        .then(() => { this.props.refreshEvent(); })
        .catch(() => { this.props.refreshEvent(); })}
    />);
  }

  UserToggleRegistrationButton() {
    return (_.some(this.props.eventFetch.value.users_attending,
    { user_id: this.props.user.id })
    ? this.UserUnregisterButton()
    : this.UserRegisterButton());
  }

  BrandRegisterButton() {
    return (<RaisedButton
      label="Attend this event"
      onTouchTap={() => eventAPI.brandRegisterAttendEvent(this.props.eventId, this.props.user.brands[0].id)
        .then(() => { this.props.refreshEvent(); })
        .catch(() => { this.props.refreshEvent(); })}
    />);
  }

  BrandUnregisterButton() {
    return (<RaisedButton
      label="Do not attend this event"
      onTouchTap={() => eventAPI.brandUnregisterAttendEvent(this.props.eventId, this.props.user.brands[0].id)
        .then(() => { this.props.refreshEvent(); })
        .catch(() => { this.props.refreshEvent(); })}
    />);
  }

  BrandToggleRegistrationButton() {
    return (this.props.user.is_truck_owner && _.some(this.props.eventFetch.value.brands_attending,
      { brand_id: this.props.user.brands[0].id })
      ? this.BrandUnregisterButton()
      : this.BrandRegisterButton());
  }

  render() {
    const { eventFetch } = this.props;

    if (eventFetch.fulfilled) {
      const UserCount = () =>
        (<Paper>
          {this.props.eventFetch.value.users_attending.length} attending
        </Paper>);

      const TruckCount = () =>
        (<Paper>
          {this.props.eventFetch.value.brands_attending.length} trucks
        </Paper>);


      // const userToggleRegistrationButton = () => userRegisterButton()

      const GettingStartedGoogleMap = withGoogleMap(() => (
        <GoogleMap
          ref={_.noop}
          defaultZoom={3}
          defaultCenter={{ lat: -25.363882, lng: 131.044922 }}
          onClick={_.noop}
        >
          {/* {props.markers.map((marker, index) => (*/}
          {/* <Marker*/}
          {/* {...marker}*/}
          {/* onRightClick={() => props.onMarkerRightClick(index)}*/}
          {/* />*/}
          {/* ))}*/}
        </GoogleMap>
      ));

      return (
        <Grid fluid>
          <Row>
            <Col xs={12} sm={12} md={5} lg={5}>
              <h2>
                {eventFetch.value.name}
              </h2>
              <h4>
                {eventFetch.value.description}
              </h4>
              <Grid fluid>
                <Col xs={8} sm={8} md={8} lg={8}>
                  Users: <this.UserToggleRegistrationButton />
                  {this.props.user.is_truck_owner &&
                  <div>
                    Brand Owners: <this.BrandToggleRegistrationButton />
                  </div>}
                  <UserCount />
                </Col>
                <Col xs={4} sm={4} md={4} lg={4}>
                  <TruckCount />
                </Col>
              </Grid>
            </Col>
            <Col xs={12} sm={12} md={7} lg={7}>

              <div style={{ height: '300px', width: '90%', margin: 'auto' }}>
                <GettingStartedGoogleMap
                  containerElement={
                    <div style={{ height: '100%', width: '100%' }} />
                  }
                  mapElement={
                    <div style={{ height: '100%', width: '100%' }} />
                  }
                  onMapLoad={_.noop}
                  onMapClick={_.noop}
                  // markers={markers}
                  onMarkerRightClick={_.noop}
                />
              </div>
            </Col>
          </Row>
          <Row>
            <div><br />
              <BrandAttendeesList attendees={eventFetch.value.brands_attending} />
            </div>
            <div><br />
              <UserAttendeesList attendees={eventFetch.value.users_attending} />
            </div>
          </Row>
        </Grid>
      );
    }
    return (<div>Loading</div>);
  }
}

EventDetail.propTypes = {
  eventFetch: PropTypes.shape({
    value: PropTypes.array,
  }),
  refreshEvent: PropTypes.func.isRequired,
  user: propSchema.user,
  eventId: PropTypes.number.isRequired,
};

export default connect((props) => {
  const url = `/api/events/${props.eventId}`;
  return {
    eventFetch: url,
    refreshEvent: () => ({
      eventFetch: {
        url,
        force: true,
        refreshing: true,
      },
    }),
  };
})(EventDetail);
