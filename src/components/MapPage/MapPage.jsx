import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import MapView from '../common/MapView';
import TrucksList from '../common/TrucksList';

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
  markers: PropTypes.arrayOf(PropTypes.shape({
    position: PropTypes.shape({ lat: PropTypes.number, lng: PropTypes.number }),
    key: PropTypes.number,
    defaultAnimation: PropTypes.number,
  })).isRequired,
  trucks: PropTypes.arrayOf(PropTypes.shape({
    brand_id: PropTypes.number,
    id: PropTypes.number,
    name: PropTypes.string,
    brands: PropTypes.object,
    locations: PropTypes.array,
  })).isRequired,
};

const mapStateToProps = ({ mapReducer }) => {
  const { markers, trucks } = mapReducer;
  return { markers, trucks };
};

export default connect(mapStateToProps, null)(MapPage);
