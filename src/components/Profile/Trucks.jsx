import React from 'react';
import propSchema from '../common/PropTypes';
import MapView from '../common/MapView';
import TrucksList from '../common/TrucksList';

const Trucks = props => (
  <div>
    <div>{props.brandName}&#39;s Food Truck(s)</div>
    <MapView markers={props.markers} />
    <TrucksList trucks={props.trucks} path={props.path} />
  </div>
);

Trucks.propTypes = {
  brandName: propSchema.brandName,
  trucks: propSchema.trucks,
  markers: propSchema.markers,
  path: propSchema.path,
};

export default Trucks;
