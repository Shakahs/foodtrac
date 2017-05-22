import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import { Link } from 'react-router-dom';
import { Col } from 'react-flexbox-grid';

const ProfileInfo = () => (
  <Col xs={12} sm={12} md={3} lg={3}>
    <Paper zDepth={1}>
      <br />
      <div className="brandName">Brand Name</div>
      <br />
      <div className="brandDescription">description of brand goes here</div>
      <br />
      <div className="brandGenre">Food Genre</div>
      <br />
    </Paper>
    <br />
    <Link to="/profile/trucks">
      <RaisedButton label="Food Trucks" className="profileButton" />
    </Link>
    <br />
    <br />
    <Link to="/profile/menu">
      <RaisedButton label="Menu" className="profileButton" />
    </Link>
    <br />
    <br />
    <Link to="/profile/events">
      <RaisedButton label="Events" className="profileButton" />
    </Link>
    <br />
    <br />
    <Link to="/profile/reviews">
      <RaisedButton label="Reviews" className="profileButton" />
    </Link>
    <br />
    <br />
    <Link to="/profile/comments">
      <RaisedButton label="Comments" className="profileButton" />
    </Link>
  </Col>
);

export default ProfileInfo;
