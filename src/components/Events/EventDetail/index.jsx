import React from 'react';
import { connect } from 'react-refetch';
import { Grid, Row, Col } from 'react-flexbox-grid';
import PropTypes from 'prop-types';
import { withGoogleMap, GoogleMap } from 'react-google-maps';
import _ from 'lodash';
import { RaisedButton } from 'material-ui';
import { Tabs, Tab } from 'material-ui/Tabs';
import UserAttendeesList from './UserAttendeesList';
import BrandAttendeesList from './BrandAttendeesList';
import CommentsList from './CommentsList';
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
            <Col xs={12} sm={12} md={12} lg={12}>
              <Tabs>
                <Tab label={`${String(this.props.eventFetch.value.comments.length)} Comments`} >
                  <div>
                    <h2>Comments</h2>
                    <p>
                      <CommentsList comments={eventFetch.value.comments} />
                    </p>
                  </div>
                </Tab>
                <Tab label={`${String(this.props.eventFetch.value.brands_attending.length)} Users Attending`} >
                  <div>
                    <h2>Brands Attending</h2>
                    <p>
                      <BrandAttendeesList attendees={eventFetch.value.brands_attending} />
                    </p>
                  </div>
                </Tab>
                <Tab label={`${String(this.props.eventFetch.value.users_attending.length)} Users Attending`} >
                  <div>
                    <h2>Users Attending</h2>
                    <p>
                      <UserAttendeesList attendees={eventFetch.value.users_attending} />
                    </p>
                  </div>
                </Tab>
              </Tabs>
            </Col>
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
