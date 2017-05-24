import React from 'react';
import PropTypes from 'prop-types';

const TruckEntry = props => (
  <div>
    <p>{props.truck.name}</p>
  </div>
);

TruckEntry.propTypes = {
  truck: PropTypes.shape({
    brand_id: PropTypes.number,
    id: PropTypes.number,
    name: PropTypes.string,
    brands: PropTypes.object,
    locations: PropTypes.array,
  }).isRequired,
};

export default TruckEntry;
