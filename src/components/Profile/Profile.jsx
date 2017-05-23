import React, { Component } from 'react';
import { Grid, Row } from 'react-flexbox-grid';
import axios from 'axios';
import PropTypes from 'prop-types';
import Cover from './Cover';
import ProfileInfo from './ProfileInfo';
import TabView from './TabView';

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      brandName: null,
      brandDescription: null,
      trucks: null,
    };
  }

  componentDidMount() {
    this.getBrandDetail();
    this.getBrandTrucks();
  }

  // need to replace 1 with ${this.props.brandId}
  getBrandDetail() {
    axios.get('/api/brands/1')
      .then((res) => {
        this.setState({ brandName: res.data[0].name });
        this.setState({ brandDescription: res.data[0].description });
      })
      .catch(err => console.log(err));
  }

  getBrandTrucks() {
    axios.get('/api/brands/1/trucks')
      .then(res => this.setState({ trucks: res.data }))
      .catch(err => console.log(err));
  }

  render() {
    return (
      <Grid fluid>
        <Row>
          <Cover />
        </Row>
        <Row>
          <ProfileInfo
            name={this.state.brandName}
            description={this.state.brandDescription}
          />
          <TabView />
        </Row>
      </Grid>
    );
  }
}

Profile.propTypes = {
  brandId: PropTypes.number.isRequired,
};

export default Profile;
