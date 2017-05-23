import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import { Link } from 'react-router-dom';
import { Col } from 'react-flexbox-grid';
import PropTypes from 'prop-types';

const ProfileInfo = props => (
  <Col xs={12} sm={12} md={3} lg={3}>
    <Paper zDepth={1}>
      <br />
      <div className="brandName">{props.name}</div>
      <br />
      <div className="brandDescription">{props.description}</div>
      <br />
      <div className="brandGenre">Food Genre</div>
      <br />
    </Paper>
    <br />
    <Link to={'/brand/123/trucks'}>
      <RaisedButton label="Food Trucks" className="profileButton" />
    </Link>
    <br />
    <br />
    <Link to={'/brand/123/menu'}>
      <RaisedButton label="Menu" className="profileButton" />
    </Link>
    <br />
    <br />
    <Link to={'/brand/123/events'}>
      <RaisedButton label="Events" className="profileButton" />
    </Link>
    <br />
    <br />
    <Link to={'/brand/123/reviews'}>
      <RaisedButton label="Reviews" className="profileButton" />
    </Link>
    <br />
    <br />
    <Link to={'/brand/123/comments'}>
      <RaisedButton label="Comments" className="profileButton" />
    </Link>
  </Col>
);

ProfileInfo.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default ProfileInfo;
