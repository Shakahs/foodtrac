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
      brandId: parseInt(this.props.match.params.brandId, 10),
      brand: {
        name: '',
        description: '',
        food_genres: { name: '' },
        trucks: [],
      },
      markers: [],
    };
    this.getBrandDetail = this.getBrandDetail.bind(this);
  }

  componentDidMount() {
    this.getBrandDetail(this.state.brandId);
  }

  componentWillReceiveProps(nextProps) {
    this.getBrandDetail(nextProps.match.params.brandId);
  }

  getBrandDetail(brandId) {
    axios.get(`/api/brands/${brandId}?eager=true`)
      .then((res) => {
        const markers = res.data.trucks.reduce((result, truck) => {
          if (truck.locations) {
            result.push({
              position: {
                lat: truck.locations.lat,
                lng: truck.locations.lng,
              },
              key: truck.locations.id,
              defaultAnimation: 2,
            });
          }
          return result;
        }, []);
        res.data.trucks.forEach((truck) => {
          truck.brands = { // eslint-disable-line no-param-reassign
            name: res.data.name,
            description: res.data.description,
            food_genres: res.data.food_genres,
            fromProfile: true,
          };
        });
        this.setState({ brandId: parseInt(this.props.match.params.brandId, 10) });
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
            path={this.props.match.path}
          />
          <TabView
            brandId={this.state.brandId}
            brandName={this.state.brand.name}
            trucks={this.state.brand.trucks}
            markers={this.state.markers}
            getBrand={this.getBrandDetail}
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
