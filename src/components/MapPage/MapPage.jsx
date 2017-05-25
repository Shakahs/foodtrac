import React, { Component } from 'react';
import { connect } from 'react-redux';
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
        <MapView markers={this.props.markers} />
        <TrucksList trucks={this.props.trucks} />
      </div>
    );
  }
}

MapPage.propTypes = {
  markers: propSchema.markers,
  trucks: propSchema.trucks,
};

const mapStateToProps = ({ mapReducer }) => {
  const { markers, trucks } = mapReducer;
  return { markers, trucks };
};

export default connect(mapStateToProps, null)(MapPage);
