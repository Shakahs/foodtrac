import React from 'react';
import { Link } from 'react-router-dom';
import { Col } from 'react-flexbox-grid';
import { FlatButton, CardText, CardActions } from 'material-ui';
import propSchema from './PropTypes';
import FollowButton from './FollowButton';
import OrderButton from './OrderButton';
import Upvote from './Upvote';
import './TruckEntry.scss';

const TruckEntry = (props) => {
  let timelineId;
  if (props.path === '/map') timelineId = props.truck.locations.timeline_id;
  return (
    <Col xs={12} sm={12} md={6} lg={6}>
      <div className="truckEntry" zDepth={3}>
        <Upvote
          timeline_id={timelineId}
          brand_id={props.truck.brand_id}
          mapUpvotes={props.truck.brands.upvotes}
          idx={props.idx}
        />
        <CardText className="truck-entry-body">
          <p>{props.truck.brands.name}: {props.truck.name !== 'null' ? <em>{props.truck.name}</em> : null}</p>
          <p>Type of food: {props.truck.brands.food_genres.name}</p>
          <p>Current location: {props.truck.locations ? props.truck.locations.address : 'Not currently active'}</p>
        </CardText>
        <CardActions className="truck-entry-btns">
          {props.path === '/brand/:brandId/trucks'
            ? null
            : <Link to={`/brand/${props.truck.brand_id}/trucks`}>
              <FlatButton label="Go to Profile" />
            </Link>}
          <FollowButton brandId={props.truck.brand_id} user={props.user} path={props.path} />
          {props.truck.order === 1 ?
            <OrderButton truck={props.truck} user={props.user} /> : null
          }
        </CardActions>
      </div>
    </Col>
  );
};

TruckEntry.propTypes = {
  truck: propSchema.truck,
  user: propSchema.user,
  path: propSchema.path,
  idx: propSchema.idx,
};

export default TruckEntry;
