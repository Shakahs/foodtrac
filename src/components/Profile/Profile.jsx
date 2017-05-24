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
      brandName: '',
      brandDescription: '',
      foodGenre: '',
      trucks: [],
    };
  }

  componentDidMount() {
    this.getBrandDetail();
  }

  getBrandDetail() {
    axios.get(`/api/brands/${this.state.brandId}?eager=true`)
      .then((res) => {
        this.setState({ brandName: res.data.name });
        this.setState({ brandDescription: res.data.description });
        this.setState({ foodGenre: res.data.food_genres.name });
        this.setState({ trucks: res.data.trucks });
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
      brandId: PropTypes.string,
    }),
  }).isRequired,
};

export default Profile;
