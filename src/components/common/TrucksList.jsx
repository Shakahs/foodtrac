import React from 'react';
import PropTypes from 'prop-types';
import TruckEntry from './TruckEntry';

const TrucksList = props => (
  <div>
    {props.trucks.map(truck => <TruckEntry truck={truck} />)}
  </div>
);

TrucksList.propTypes = {
  trucks: PropTypes.arrayOf(PropTypes.shape({
    brand_id: PropTypes.number,
    id: PropTypes.number,
    name: PropTypes.string,
    brands: PropTypes.object,
    locations: PropTypes.array,
  })).isRequired,
};

export default TrucksList;
