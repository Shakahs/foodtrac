import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
import propSchema from './PropTypes';

const WrappedMap = withGoogleMap(props => (
  <GoogleMap
    ref={props.onMapLoad}
    defaultZoom={11}
    center={props.center}
  >
    {props.markers.map(marker => (
      <Marker
        {...marker}
      />
    ))}
  </GoogleMap>
));

class MapView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      center: { lat: 0, lng: 0 },
    };

    this.handleMapLoad = this.handleMapLoad.bind(this);
    this.calculateCenter = this.calculateCenter.bind(this);
  }

  componentDidMount() {
    this.calculateCenter(this.props.markers);
  }

  componentDidUpdate(prevProps) {
    if (!_.isEqual(prevProps.markers, this.props.markers)) {
      this.calculateCenter(this.props.markers);
    }
  }

  handleMapLoad(map) {
    this._mapComponent = map;
    if (map) {
      console.log(map.getZoom());
    }
  }

  calculateCenter(markers) {
    // calc average lat and lng to center the map
    let center = Object.assign({}, this.state.center);
    if (markers.length > 0) {
      center = markers.reduce((coords, location) => {
        const curr = coords;
        curr.lat += location.position.lat;
        curr.lng += location.position.lng;
        return curr;
      }, {
        lat: 0,
        lng: 0,
      });

      center.lat /= markers.length;
      center.lng /= markers.length;
    }

    this.setState({ center });
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
    if (this.props.markers.length > 0) {
      return (
        <div style={{ height: '550px', width: '90%', margin: 'auto' }}>
          <WrappedMap
            containerElement={
              <div style={{ height: '100%', width: '100%' }} />
            }
            mapElement={
              <div style={{ height: '100%', width: '100%' }} />
            }
            onMapLoad={this.handleMapLoad}
            markers={this.props.markers}
            center={this.state.center}
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
  markers: propSchema.markers,
  path: propSchema.path,
};

export default MapView;
