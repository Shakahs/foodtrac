import React from 'react';
import PropTypes from 'prop-types';
import { Col } from 'react-flexbox-grid';
import Paper from 'material-ui/Paper';

const TruckEntry = props => (
  <Col xs={12} sm={12} md={6} lg={6}>
    {console.log(props.truck)}
    <Paper className="truckEntry">
      <p>{props.truck.brands.name}: {props.truck.name !== 'null' ? <em>{props.truck.name}</em> : null}</p>
      <p>Type of food: {props.truck.brands.food_genres.name}</p>
      <p>Current locations: {props.truck.locations[0].address}</p>
    </Paper>
  </Col>
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
