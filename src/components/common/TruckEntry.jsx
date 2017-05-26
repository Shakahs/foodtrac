import React from 'react';
import { Link } from 'react-router-dom';
import { Col } from 'react-flexbox-grid';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import propSchema from './PropTypes';
import FollowButton from './FollowButton';

const TruckEntry = props => (
  <Col xs={12} sm={12} md={6} lg={6}>
    <Paper className="truckEntry">
      <p>{props.truck.brands.name}: {props.truck.name !== 'null' ? <em>{props.truck.name}</em> : null}</p>
      <p>Type of food: {props.truck.brands.food_genres.name}</p>
      <p>Current locations: {props.truck.locations[0].address}</p>
      {props.path === '/brand/:brandId/trucks'
      ? null
      : <Link to={`/brand/${props.truck.brand_id}/trucks`}>
        <RaisedButton label="Go to Profile" />
      </Link>}
      <FollowButton brandId={props.truck.brand_id} user={props.user} path={props.path} />
    </Paper>
  </Col>
    );

TruckEntry.propTypes = {
  truck: propSchema.truck,
  user: propSchema.user,
  path: propSchema.path,
};

export default TruckEntry;
