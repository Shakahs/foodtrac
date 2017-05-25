import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Col } from 'react-flexbox-grid';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';

const TruckEntry = props => (
  <Col xs={12} sm={12} md={6} lg={6}>
    {console.log('in truck entry', props.truck.brands)}
    <Paper className="truckEntry">
      <p>{props.truck.brands.name}: {props.truck.name !== 'null' ? <em>{props.truck.name}</em> : null}</p>
      <p>Type of food: {props.truck.brands.food_genres.name}</p>
      <p>Current locations: {props.truck.locations[0].address}</p>
      <Link to={`/brand/${props.truck.brand_id}/trucks`}>
        <RaisedButton label="Go to Profile" />
      </Link>
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
