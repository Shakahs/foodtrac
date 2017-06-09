import React from 'react';
import { Link } from 'react-router-dom';
import { Col } from 'react-flexbox-grid';
import { RaisedButton, Paper, Avatar } from 'material-ui';
import propSchema from '../common/PropTypes';
import Upvote from '../common/Upvote';
import FollowButton from '../common/FollowButton';
import './ProfileInfo.scss';

const ProfileInfo = props => (
  <Col xs={12} sm={12} md={3} lg={3}>
    <Paper className="logoContainer">
      <Avatar
        className="brandLogo"
        // src="http://job.ihworld.com/sites/default/files/default_images/company-profile-default-logo.jpg"
        src={props.logo && props.logo.filename.length > 0
          ? `https://storage.googleapis.com/foodtrac/${props.logo.filename}`
          : 'http://job.ihworld.com/sites/default/files/default_images/company-profile-default-logo.jpg'
        }
        size={150}
      />
    </Paper>
    <Paper zDepth={1}>
      <Upvote brand_id={props.brandId} upvotes={props.upvotes} />
      <div className="profile-info">
        <p className="brandName">{props.brandName}</p>
        <p className="brandDescription">{props.description}</p>
        <p className="brandGenre">{props.foodGenre}</p>
      </div>
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
    <br />
    <br />
    {props.user.brands.map(brand => brand.id).includes(Number(props.brandId)) ?
      props.trucks.map((truck, i) => {
        const name = truck.name === 'null' ? `Food Truck ${i + 1}` : truck.name;
        return (truck.order === 1 ?
          <div key={truck.id}>
            <Link to={`/brand/${props.brandId}/orders/${truck.id}`}>
              <RaisedButton label={`Incoming Orders for ${name}`} className="profileButton" />
            </Link>
            <br />
            <br />
          </div> : null);
      }) : null
    }
  </Col>
);

ProfileInfo.propTypes = {
  brandId: propSchema.brandId,
  brandName: propSchema.brandName,
  description: propSchema.description,
  upvotes: propSchema.upvotes,
  foodGenre: propSchema.foodGenre,
  path: propSchema.path,
  user: propSchema.user,
  trucks: propSchema.trucks,
  logo: propSchema.logo,
};

export default ProfileInfo;

    // {props.trucks.map(truck => truck.order).includes(1) ?
    //   <Link to={`/brand/${props.brandId}/orders`}>
    //     <RaisedButton label="Incoming Orders" className="profileButton" />
    //   </Link> : null
    // }
