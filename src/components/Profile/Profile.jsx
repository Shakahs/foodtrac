import React, { Component } from 'react';
import { Grid, Row } from 'react-flexbox-grid';
import PropTypes from 'prop-types';
import axios from 'axios';
import Cover from './Cover';
import ProfileInfo from './ProfileInfo';
import TabView from './TabView';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      brandId: this.props.match.params.brandId,
      brandName: null,
      brandDescription: null,
      foodGenre: null,
      trucks: null,
    };
  }

  componentDidMount() {
    this.getBrandDetail();
    this.getFoodGenre();
    this.getBrandTrucks();
  }

  getBrandDetail() {
    axios.get(`/api/brands/${this.state.brandId}`)
      .then((res) => {
        this.setState({ brandName: res.data[0].name });
        this.setState({ brandDescription: res.data[0].description });
      })
      .catch(err => console.log(err));
  }

  getFoodGenre() {
    axios.get(`/api/foodgenre/${this.state.brandId}`)
      .then(res => this.setState({ foodGenre: res.data[0].name }))
      .catch(err => console.log(err));
  }

  getBrandTrucks() {
    axios.get(`/api/brands/${this.state.brandId}/trucks`)
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
            brandName={this.state.brandName}
            description={this.state.brandDescription}
            foodGenre={this.state.foodGenre}
          />
          <TabView
            brandName={this.state.brandName}
            trucks={this.state.trucks}
          />
        </Row>
      </Grid>
    );
  }
}

Profile.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      brandId: PropTypes.number,
    }),
  }).isRequired,
};

export default Profile;
