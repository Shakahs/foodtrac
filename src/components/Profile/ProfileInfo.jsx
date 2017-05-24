import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Col } from 'react-flexbox-grid';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';

// switch isTruckOwner with variable from redux user object
const isTruckOwner = true;

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
    {isTruckOwner ?
      <Link to={`/brand/${props.brandId}/manage`}>
        <RaisedButton label="Manage" className="profileButton" />
      </Link>
    :
      null
    }
  </Col>
);

ProfileInfo.propTypes = {
  brandId: PropTypes.string.isRequired,
  brandName: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  foodGenre: PropTypes.string.isRequired,
};

const mapStateToProps = ({ user }) => ({
  user,
});

export default connect(mapStateToProps, null)(ProfileInfo);
