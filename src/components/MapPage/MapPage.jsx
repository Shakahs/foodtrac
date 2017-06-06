import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import MapView from '../common/MapView';
import TrucksList from '../common/TrucksList';
import propSchema from '../common/PropTypes';

class MapPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <MapView trucks={this.props.trucks} mapCenter={this.props.mapCenter} path={this.props.match.path} />
        <TrucksList trucks={this.props.trucks} path={this.props.match.path} />
      </div>
    );
  }
}

MapPage.propTypes = {
  trucks: propSchema.trucks,
  match: propSchema.match,
  mapCenter: PropTypes.shape({
    lat: PropTypes.number,
    lng: PropTypes.number,
  }).isRequired,
};

const mapStateToProps = state => ({
  trucks: state.map.trucks,
  mapCenter: state.map.mapCenter,
});

export default connect(mapStateToProps, null)(MapPage);
