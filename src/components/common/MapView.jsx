import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import { withGoogleMap, GoogleMap, Marker, InfoWindow } from 'react-google-maps';
import PropTypes from 'prop-types';
import propSchema from './PropTypes';
import TruckEmblem from '../common/Emblem/TruckEmblem';

const topMarkerColors = ['FFD700', 'C0C0C0', 'CD7F32'];
// TODO: refactor to set marker colors on multiple markers if they have same upvote score and only color if on /map
const TruckMap = withGoogleMap(props => (
  <GoogleMap
    zoom={12}
    center={props.center}
  >
    {props.trucks.map((truck, idx) => (
      <Marker
        icon={`http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|${idx < 3 ? topMarkerColors[idx] : 'FB7064'}`}
        position={{
          lat: truck.locations.lat,
          lng: truck.locations.lng }}
        onClick={() => props.onMarkerClick(truck)}
        // visibleTruckInfo={props.visibleTruckInfo}
      >
        {props.visibleTruckInfo.indexOf(truck.id) >= 0 && (
        <InfoWindow onCloseClick={() => props.onMarkerClose(truck)}>
          <TruckEmblem truck={truck} />
        </InfoWindow>
     )}
      </Marker>
     ))}
  </GoogleMap>
));

class MapView extends Component {
  constructor(props) {
    super(props);
    console.log('initialprops', props);
    this.state = {
      center: { lat: 0, lng: 0 },
      visibleTruckInfo: [],
    };

    this.showTruckInfo = this.showTruckInfo.bind(this);
    this.hideTruckInfo = this.hideTruckInfo.bind(this);
    this.calculateCenter = this.calculateCenter.bind(this);
  }

  componentDidMount() {
    this.calculateCenter(this.props.trucks);
  }

  componentDidUpdate(prevProps) {
    if (!_.isEqual(prevProps.mapCenter, this.props.mapCenter)) {
      this.setState({ center: this.props.mapCenter }); // eslint-disable-line react/no-did-update-set-state
    }

    if (!_.isEqual(prevProps.trucks, this.props.trucks)) {
      this.calculateCenter(this.props.trucks);
    }
  }

  calculateCenter(trucks) {
    // calc average lat and lng to center the map
    let center = Object.assign({}, this.state.center);
    if (trucks.length > 0) {
      center = trucks.reduce((coords, truck) => {
        const curr = coords;
        curr.lat += truck.locations.lat;
        curr.lng += truck.locations.lng;
        return curr;
      }, {
        lat: 0,
        lng: 0,
      });

      center.lat /= trucks.length;
      center.lng /= trucks.length;
    }

    this.setState({ center });
  }

  showTruckInfo(truck) {
    const newShowList = this.state.visibleTruckInfo.slice();
    newShowList.push(truck.id);
    this.setState({ visibleTruckInfo: newShowList });
  }

  hideTruckInfo(truck) {
    const newShowList = _.without(this.state.visibleTruckInfo, truck.id);
    this.setState({ visibleTruckInfo: newShowList });
  }

  renderNotFoundMsg() {
    return (
      <Paper className="center-text" zDepth={3}>
        <h2>No active trucks found on the map.</h2>
        {
          (this.props.path === '/map')
          ? <div>
            <h3>Try to broaden your search!</h3>
            <Link to="/">Click here to return to dashboard</Link>
          </div>
          : null
        }
      </Paper>
    );
  }

  renderMap() {
    if (this.props.trucks.length > 0) {
      return (
        <div style={{ height: '550px', width: '90%', margin: 'auto' }}>
          <TruckMap
            containerElement={
              <div style={{ height: '100%', width: '100%' }} />
            }
            mapElement={
              <div style={{ height: '100%', width: '100%' }} />
            }
            trucks={this.props.trucks}
            center={this.state.center}
            visibleTruckInfo={this.state.visibleTruckInfo}
            onMarkerClick={this.showTruckInfo}
            onMarkerClose={this.hideTruckInfo}
          />
        </div>
      );
    }
    return this.renderNotFoundMsg();
  }

  render() {
    return this.renderMap();
  }
}

MapView.propTypes = {
  trucks: propSchema.trucks,
  path: propSchema.path,
  mapCenter: PropTypes.shape({
    id: PropTypes.number,

  }),
};

export default MapView;
