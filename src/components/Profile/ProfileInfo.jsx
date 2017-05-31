import React from 'react';
import { Link } from 'react-router-dom';
import { Col } from 'react-flexbox-grid';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import propSchema from '../common/PropTypes';
import FollowButton from '../common/FollowButton';
import './ProfileInfo.scss';

const ProfileInfo = props => (
  <Col xs={12} sm={12} md={3} lg={3}>
    <Paper zDepth={1}>
      <br />
      <div className="brandName">{props.brandName}</div>
      <br />
      <div className="brandDescription">{props.description}</div>
      <br />
      <div className="brandGenre">{props.foodGenre}</div>
      <br />
      <FollowButton
        brandId={props.brandId}
        user={props.user}
        path={props.path}
      />
    </Paper>
    <br />
    <Link to={`/brand/${props.brandId}/trucks`}>
      <RaisedButton label="Food Trucks" className="profileButton" />
    </Link>
    <br />
    <br />
    <Link to={`/brand/${props.brandId}/menu`}>
      <RaisedButton label="Menu" className="profileButton" />
    </Link>
    <br />
    <br />
    <Link to={`/brand/${props.brandId}/events`}>
      <RaisedButton label="Events" className="profileButton" />
    </Link>
    <br />
    <br />
    <Link to={`/brand/${props.brandId}/reviews`}>
      <RaisedButton label="Reviews" className="profileButton" />
    </Link>
    <br />
    <br />
    <Link to={`/brand/${props.brandId}/comments`}>
      <RaisedButton label="Comments" className="profileButton" />
    </Link>
    <br />
    <br />
    {props.user.brands.map(brand => brand.id).includes(Number(props.brandId)) ?
      <Link to={`/brand/${props.brandId}/manage`}>
        <RaisedButton label="Manage" className="profileButton" />
      </Link> : null
    }
  </Col>
);

ProfileInfo.propTypes = {
  brandId: propSchema.brandId,
  brandName: propSchema.brandName,
  description: propSchema.description,
  foodGenre: propSchema.foodGenre,
  path: propSchema.path,
  user: propSchema.user,
};

export default ProfileInfo;
