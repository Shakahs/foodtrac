import _ from 'lodash';
import React from 'react';
import { Card, CardHeader } from 'material-ui';
import { Link } from 'react-router-dom';
import TruckList from '../common/TrucksList';
import propSchema from '../common/PropTypes';

const attachBrandToTrucks = (trucks, brand) => _.map(trucks, (truck) => {
  const mutableTruck = Object.assign({}, truck);
  mutableTruck.brands = brand;
  return mutableTruck;
});

const FollowedEntry = props => (
  <Card style={{ margin: '15px 20px 0px 20px' }}>
    <Link to={`/brand/${props.brand.id}/trucks`}>
      <div className="card-header">
        <CardHeader
          title={props.brand.name}
          subtitle={props.brand.description}
        />
      </div>
    </Link>
    {props.brand.trucks && props.brand.trucks.length > 0
      ? <TruckList trucks={attachBrandToTrucks(props.brand.trucks, props.brand)} />
      : <h2>{'This brand has no trucks at the moment.'}</h2>}
  </Card>
);

FollowedEntry.propTypes = {
  brand: propSchema.brand,
};

export default FollowedEntry;
