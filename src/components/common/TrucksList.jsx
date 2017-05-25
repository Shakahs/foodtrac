import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Row } from 'react-flexbox-grid';
import TruckEntry from './TruckEntry';

const TrucksList = props => (
  <Grid fluid>
    <Row>
      {props.trucks.map(truck => <TruckEntry key={truck.id} truck={truck} />)}
    </Row>
  </Grid>
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
