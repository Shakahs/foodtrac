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
      brand: {
        name: '',
        description: '',
        food_genres: { name: '' },
        trucks: [],
      },
    };
  }

  componentDidMount() {
    this.getBrandDetail();
  }

  getBrandDetail() {
    axios.get(`/api/brands/${this.state.brandId}?eager=true`)
      .then((res) => {
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
          />
        </Row>
      </Grid>
    );
  }
}

Profile.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      brandId: PropTypes.string,
    }),
  }).isRequired,
};

export default Profile;
