import React from 'react';
import { connect } from 'react-refetch';
import { Grid, Row, Col } from 'react-flexbox-grid';
import PropTypes from 'prop-types';
import { withGoogleMap, GoogleMap } from 'react-google-maps';
import Paper from 'material-ui/Paper';
import _ from 'lodash';
import UserAttendeesList from './UserAttendeesList';
import BrandAttendeesList from './BrandAttendeesList';


class EventDetail extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { eventFetch } = this.props;

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


    if (eventFetch.fulfilled) {
      const UserCount = () =>
        (<Paper>
          {this.props.eventFetch.value.users_attending.length} attending
        </Paper>);
      const TruckCount = () =>
        (<Paper>
          {this.props.eventFetch.value.brands_attending.length} trucks
        </Paper>);
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
                <Col xs={4} sm={4} md={4} lg={4}>
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
};

export default connect(props => ({
  eventFetch: `/api/events/${props.match.params.eventId}`,
}))(EventDetail);
