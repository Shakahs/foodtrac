import React from 'react';
import { Link } from 'react-router-dom';
import { Col } from 'react-flexbox-grid';
import { FlatButton, Card, CardText, CardActions } from 'material-ui';
import propSchema from './PropTypes';
import TruckEmblem from './Emblem/TruckEmblem';
import FollowButton from './FollowButton';
import OrderButton from './OrderButton';
import Upvote from './Upvote';
import './TruckEntry.scss';

const TruckEntry = (props) => {
  let timelineId;
  const shouldRenderProfileLink = props.path === '/map';
  if (props.path === '/map') timelineId = props.truck.locations.timeline_id;
  return (
    <Col xs={12} sm={12} md={6} lg={6}>
      <Card className="truckEntry">
        <TruckEmblem truck={props.truck} />
        <div>
          <Upvote
            timeline_id={timelineId}
            brand_id={props.truck.brand_id}
            mapUpvotes={props.truck.brands.upvotes}
            idx={props.idx}
          />
          <div className="truck-entry-body">
            <CardText className="card-text">{props.truck.name !== 'null' ? <em>Truck: {props.truck.name}</em> : 'Unnamed Truck'}</CardText>
            <CardText className="card-text">Type of food: {props.truck.brands.food_genres.name}</CardText>
            <CardText className="card-text">Current location: {props.truck.locations ? props.truck.locations.address : 'Not currently active'}</CardText>
          </div>
          <CardActions className="truck-entry-btns">
            {shouldRenderProfileLink
            ? <Link to={`/brand/${props.truck.brand_id}/`}>
              <FlatButton label="Go to Profile" />
            </Link>
            : null}
            <FollowButton brandId={props.truck.brand_id} user={props.user} path={props.path} />
            {props.truck.order === 1 ?
              <OrderButton truck={props.truck} user={props.user} /> : null
          }
          </CardActions>
        </div>
      </Card>
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
