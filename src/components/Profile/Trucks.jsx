import React from 'react';
import PropTypes from 'prop-types';
import MapView from '../common/MapView';
import TrucksList from '../common/TrucksList';

const Trucks = props => (
  <div>
    <div>{props.brandName}&#39;s Food Truck(s)</div>
    <MapView markers={props.markers} />
    <TrucksList trucks={props.trucks} />
  </div>
);

Trucks.propTypes = {
  brandName: PropTypes.string.isRequired,
  trucks: PropTypes.arrayOf(PropTypes.shape({
    brand_id: PropTypes.number,
    id: PropTypes.number,
    name: PropTypes.string,
    locations: PropTypes.array,
  })).isRequired,
  markers: PropTypes.arrayOf(PropTypes.shape({
    position: PropTypes.shape({ lat: PropTypes.number, lng: PropTypes.number }),
    key: PropTypes.number,
    defaultAnimation: PropTypes.number,
  })).isRequired,
};

export default Trucks;
