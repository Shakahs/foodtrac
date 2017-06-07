import _ from 'lodash';
import React from 'react';
import { CardHeader } from 'material-ui';
import { Link } from 'react-router-dom';
import TruckList from '../common/TrucksList';
import propSchema from '../common/PropTypes';
import './FollowedEntry.scss';

const attachBrandToTrucks = (trucks, brand) => _.map(trucks, (truck) => {
  const mutableTruck = Object.assign({}, truck);
  mutableTruck.brands = brand;
  return mutableTruck;
});

const FollowedEntry = props => (
  <div>
    <Link to={`/brand/${props.brand.id}/trucks`}>
      <div className="brand-card-header">
        <CardHeader
          title={props.brand.name}
          subtitle={props.brand.description}
        />
      </div>
    </Link>
    <TruckList trucks={attachBrandToTrucks(props.brand.trucks, props.brand)} />
  </div>
);

FollowedEntry.propTypes = {
  brand: propSchema.brand,
};

export default FollowedEntry;
