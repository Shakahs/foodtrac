import _ from 'lodash';
import React from 'react';
import TruckList from '../common/TrucksList';
import propSchema from '../common/PropTypes';

const attachBrandToTrucks = (trucks, brand) => _.map(trucks, (truck) => {
  const mutableTruck = Object.assign({}, truck);
  mutableTruck.brands = brand;
  return mutableTruck;
});

const FollowedEntry = props => (
  <div>
    {props.brand.trucks && props.brand.trucks.length > 0
      ? <TruckList trucks={attachBrandToTrucks(props.brand.trucks, props.brand)} />
      : <h2>{'This brand has no trucks at the moment.'}</h2>}
  </div>
);

FollowedEntry.propTypes = {
  brand: propSchema.brand,
};

export default FollowedEntry;
