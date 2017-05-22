import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { Link } from 'react-router-dom';

const ProfileInfo = () => (
  <div>
    <h2>Brand Name</h2>
    <p>description of brand</p>
    <h3>Food Genre</h3>
    <br />
    <br />
    <Link to="/profile/trucks">
      <RaisedButton label="Food Trucks" />
    </Link>
    <br />
    <br />
    <Link to="/profile/menu">
      <RaisedButton label="Menu" />
    </Link>
    <br />
    <br />
    <Link to="/profile/events">
      <RaisedButton label="Events" />
    </Link>
    <br />
    <br />
    <Link to="/profile/reviews">
      <RaisedButton label="Reviews" />
    </Link>
    <br />
    <br />
    <Link to="/profile/comments">
      <RaisedButton label="Comments" />
    </Link>
  </div>
);

export default ProfileInfo;
