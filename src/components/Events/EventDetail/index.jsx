import axios from 'axios';
import React from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';
import PropTypes from 'prop-types';
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
import _ from 'lodash';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { RaisedButton } from 'material-ui';
import { Tabs, Tab } from 'material-ui/Tabs';
import FontIcon from 'material-ui/FontIcon';
import 'font-awesome/css/font-awesome.min.css';
import UserAttendeesList from './UserAttendeesList';
import BrandAttendeesList from './BrandAttendeesList';
import { eventAPI, commentAPI } from '../../../api';
import propSchema from '../../common/PropTypes';
import CommentsView from '../../common/Comments';
import { actions as userActions } from '../../../redux/user';
import { actions as loadingActions } from '../../../redux/Loading';
import AuthorizedComponent from '../../common/Helpers/AuthorizedComponent';

class EventDetail extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);

    this.state = {
      event: null,
    };

    this.UserRegisterButton = this.UserRegisterButton.bind(this);
    this.UserUnregisterButton = this.UserUnregisterButton.bind(this);
    this.UserToggleRegistrationButton = this.UserToggleRegistrationButton.bind(this);
    this.BrandRegisterButton = this.BrandRegisterButton.bind(this);
    this.BrandUnregisterButton = this.BrandUnregisterButton.bind(this);
    this.BrandToggleRegistrationButton = this.BrandToggleRegistrationButton.bind(this);
    this.submitComment = this.submitComment.bind(this);
    this.editComment = this.editComment.bind(this);
    this.deleteComment = this.deleteComment.bind(this);
    this.refreshEvent = this.refreshEvent.bind(this);
  }

  componentDidMount() {
    this.refreshEvent();
  }

  refreshEvent() {
    axios.get(`/api/events/${this.props.eventId}`)
      .then(({ data }) => {
        this.setState({ event: data });
      })
      .then(() => { this.props.userActions.requestUserData(this.props.user.id); });
  }

  UserRegisterButton() {
    return (<RaisedButton
      icon={<FontIcon className="fa fa-calendar" />}
      label="Attend this event"
      onTouchTap={() => eventAPI.userRegisterAttendEvent(this.props.eventId, this.props.user.id)
          .then(() => { this.refreshEvent(); })
          .catch(() => { this.refreshEvent(); })}
    />);
  }

  UserUnregisterButton() {
    return (<RaisedButton
      icon={<FontIcon className="fa fa-calendar" />}
      label="Do not attend this event"
      onTouchTap={() => eventAPI.userUnregisterAttendEvent(this.props.eventId, this.props.user.id)
        .then(() => { this.refreshEvent(); })
        .catch(() => { this.refreshEvent(); })}
    />);
  }

  UserToggleRegistrationButton() {
    return (_.some(this.state.event.users_attending,
    { user_id: this.props.user.id })
    ? this.UserUnregisterButton()
    : this.UserRegisterButton());
  }

  BrandRegisterButton() {
    return (<RaisedButton
      icon={<FontIcon className="fa fa-truck" />}
      secondary
      label="Attend this event"
      onTouchTap={() => eventAPI.brandRegisterAttendEvent(this.props.eventId, this.props.user.brands[0].id)
        .then(() => { this.refreshEvent(); })
        .catch(() => { this.refreshEvent(); })}
    />);
  }

  BrandUnregisterButton() {
    return (<RaisedButton
      icon={<FontIcon className="fa fa-truck" />}
      secondary
      label="Do not attend this event"
      onTouchTap={() => eventAPI.brandUnregisterAttendEvent(this.props.eventId, this.props.user.brands[0].id)
        .then(() => { this.refreshEvent(); })
        .catch(() => { this.refreshEvent(); })}
    />);
  }

  BrandToggleRegistrationButton() {
    return (this.props.user.is_truck_owner && _.some(this.state.event.brands_attending,
      { brand_id: this.props.user.brands[0].id })
      ? this.BrandUnregisterButton()
      : this.BrandRegisterButton());
  }

  submitComment({ text }) {
    commentAPI.createEventComment(text, this.props.user.id, Number(this.props.eventId))
      .then(() => (this.refreshEvent()));
  }

  editComment(text, commentId) {
    commentAPI.editEventComment(text, commentId, this.props.eventId)
      .then(() => (this.refreshEvent()));
  }

  deleteComment(commentId) {
    commentAPI.deleteEventComment(commentId, this.props.eventId)
      .then(() => (this.refreshEvent()));
  }

  render() {
    const event = this.state.event;
    this.props.loadingActions.startLoading();
    if (this.state.event) {
      this.props.loadingActions.endLoading();
      const GettingStartedGoogleMap = withGoogleMap(() => (
        <GoogleMap
          defaultZoom={15}
          defaultCenter={{
            lat: event.locations.lat,
            lng: event.locations.lng,
          }}
        >
          <Marker
            position={{
              lat: event.locations.lat,
              lng: event.locations.lng,
            }}
          />
        </GoogleMap>
      ));
      return (
        <Grid fluid>
          <Row>
            <Col xs={12} sm={12} md={5} lg={5}>
              <h2>
                {event.name}
              </h2>
              <h4>
                {event.locations.address}
              </h4>
              <div>
                <AuthorizedComponent>
                  <this.UserToggleRegistrationButton />
                </AuthorizedComponent>
                <AuthorizedComponent requireTruckOwner >
                  <this.BrandToggleRegistrationButton />
                </AuthorizedComponent>
              </div>
              <h4>
                {event.description}
              </h4>
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
                />
              </div>
            </Col>
          </Row>
          <Row>
            <Col xs={12} sm={12} md={12} lg={12}>
              <Tabs>
                <Tab label={`${String(event.comments.length)} Comments`}>
                  <CommentsView
                    comments={event.comments}
                    submitComment={this.submitComment}
                    removeComment={this.deleteComment}
                    editComment={this.editComment}
                  />
                </Tab>
                <Tab label={`${String(event.brands_attending.length)} Trucks Attending`}>
                  <BrandAttendeesList attendees={event.brands_attending} />
                </Tab>
                <Tab label={`${String(event.users_attending.length)} Users Attending`}>
                  <UserAttendeesList attendees={event.users_attending} />
                </Tab>
              </Tabs>
            </Col>
          </Row>
        </Grid>
      );
    }
    return (<div />);
  }
}

EventDetail.propTypes = {
  user: propSchema.user,
  eventId: PropTypes.number.isRequired,
  userActions: propSchema.userActions,
  loadingActions: propSchema.loadingActions,
};

const mapStateToProps = state => ({
  user: state.user,
});

const mapDispatchToProps = dispatch => ({
  userActions: bindActionCreators(userActions, dispatch),
  loadingActions: bindActionCreators(loadingActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(EventDetail);
