import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import { Link } from 'react-router-dom';
import { withGoogleMap, GoogleMap, Marker, InfoWindow } from 'react-google-maps';
import propSchema from './PropTypes';
import TruckEmblem from '../common/Emblem/TruckEmblem';

const topMarkerColors = ['FFD700', 'C0C0C0', 'CD7F32'];
// TODO: refactor to set marker colors on multiple markers if they have same upvote score and only color if on /map
// const WrappedMap = withGoogleMap(props => (
//   <GoogleMap
//     ref={props.onMapLoad}
//     defaultZoom={11}
//     // center={props.center}
//   >
//     {props.trucks.map((truck, idx) => (
//       <Marker
//         icon={`http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|${idx < 3 ? topMarkerColors[idx] : 'FB7064'}`}
//         position={{
//           lat: truck.locations.lat,
//           lng: truck.locations.lng }}
//       />
//     ))}
//   </GoogleMap>
// ));

class MapView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // center: { lat: 0, lng: 0 },
      visibleTruckInfo: [],
    };

    // this.handleMapLoad = this.handleMapLoad.bind(this);
    // this.calculateCenter = this.calculateCenter.bind(this);
    this.showTruckInfo = this.showTruckInfo.bind(this);
  }

  componentDidMount() {
    // this.calculateCenter(this.state.markers);
  }

  // componentDidUpdate(prevProps) {
  //   if (!_.isEqual(prevProps.trucks, this.props.trucks)) {
  //     this.calculateCenter(this.props.markers);
  //   }
  // }

  // handleMapLoad(map) {
  //   this._mapComponent = map;
  //   if (map) {
  //     console.log(map.getZoom());
  //   }
  // }

  // calculateCenter(markers) {
  //   // calc average lat and lng to center the map
  //   let center = Object.assign({}, this.state.center);
  //   if (markers.length > 0) {
  //     center = markers.reduce((coords, location) => {
  //       const curr = coords;
  //       curr.lat += location.position.lat;
  //       curr.lng += location.position.lng;
  //       return curr;
  //     }, {
  //       lat: 0,
  //       lng: 0,
  //     });
  //
  //     center.lat /= markers.length;
  //     center.lng /= markers.length;
  //   }
  //
  //   this.setState({ center });
  // }

  showTruckInfo(truck) {
    const newShowList = this.state.visibleTruckInfo.slice();
    newShowList.push(truck.id);
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

  render() {
    if (this.props.trucks.length > 0) {
      const TruckMap = withGoogleMap(props => (
        <GoogleMap
          defaultZoom={15}
          defaultCenter={{
            lat: this.props.trucks[0].locations.lat,
            lng: this.props.trucks[0].locations.lng }}
          visibleTruckInfo={props.visibleTruckInfo}
        >
          {this.props.trucks.map((truck, idx) => (
            <Marker
              icon={`http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|${idx < 3 ? topMarkerColors[idx] : 'FB7064'}`}
              position={{
                lat: truck.locations.lat,
                lng: truck.locations.lng }}
              onClick={() => this.showTruckInfo(truck)}
              visibleTruckInfo={props.visibleTruckInfo}
            >
              {props.visibleTruckInfo.indexOf(truck.id) >= 0 && (
              <InfoWindow>
                <TruckEmblem truck={truck} />
              </InfoWindow>
                )}
            </Marker>
          ))}
        </GoogleMap>
      ));


      return (
        <div style={{ height: '550px', width: '90%', margin: 'auto' }}>
          <TruckMap
            containerElement={
              <div style={{ height: '100%', width: '100%' }} />
            }
            mapElement={
              <div style={{ height: '100%', width: '100%' }} />
            }
            // onMapLoad={this.handleMapLoad}
            // trucks={this.props.trucks}
            // center={this.state.center}
            visibleTruckInfo={this.state.visibleTruckInfo}
          />
        </div>
      );
    }
    return this.renderNotFoundMsg();
  }
}

MapView.propTypes = {
  trucks: propSchema.trucks,
  path: propSchema.path,
};

export default MapView;
