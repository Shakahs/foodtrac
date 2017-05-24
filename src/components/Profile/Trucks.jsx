import React from 'react';
import PropTypes from 'prop-types';
import MapView from '../common/MapView';
import TrucksList from './TrucksList';

const Trucks = props => (
  <div>
    <div>{props.brandName}&#39;s Food Truck(s)</div>
    <MapView />
    <TrucksList trucks={props.trucks} />
  </div>
);

Trucks.propTypes = {
  brandName: PropTypes.string.isRequired,
  trucks: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Trucks;
