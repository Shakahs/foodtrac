import React, { Component } from 'react';
import { Grid, Row } from 'react-flexbox-grid';
import axios from 'axios';
import propSchema from '../common/PropTypes';
import Cover from './Cover';
import ProfileInfo from './ProfileInfo';
import TabView from './TabView';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      brandId: this.props.match.params.brandId,
      brand: {
        name: '',
        description: '',
        food_genres: { name: '' },
        trucks: [],
      },
      markers: [],
    };
  }

  componentDidMount() {
    this.getBrandDetail();
  }

  getBrandDetail() {
    axios.get(`/api/brands/${this.state.brandId}?eager=true`)
      .then((res) => {
        const markers = res.data.trucks.map(truck => ({
          position: {
            lat: truck.locations[0].lat,
            lng: truck.locations[0].lng,
          },
          key: truck.locations[0].id,
          defaultAnimation: 2,
        }));
        res.data.trucks.forEach((truck) => {
          truck.brands = { // eslint-disable-line no-param-reassign
            name: res.data.name,
            description: res.data.description,
            food_genres: res.data.food_genres,
          };
        });
        this.setState({ markers });
        this.setState({ brand: res.data });
      })
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
            brandId={this.state.brandId}
            brandName={this.state.brand.name}
            description={this.state.brand.description}
            foodGenre={this.state.brand.food_genres.name}
          />
          <TabView
            brandName={this.state.brand.name}
            trucks={this.state.brand.trucks}
            markers={this.state.markers}
          />
        </Row>
      </Grid>
    );
  }
}

Profile.propTypes = {
  match: propSchema.match,
};

export default Profile;
