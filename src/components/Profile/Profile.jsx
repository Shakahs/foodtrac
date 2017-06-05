import React, { Component } from 'react';
import { Grid, Row } from 'react-flexbox-grid';
import _ from 'lodash';
import axios from 'axios';
import { connect } from 'react-redux';
import propSchema from '../common/PropTypes';
import { actions as profileActions } from '../../redux/CurrentProfile';
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
        brand_comments: [],
        menu_items: [],
      },
      markers: [],
    };
    this.getBrandDetail = this.getBrandDetail.bind(this);
    this.submitComment = this.submitComment.bind(this);
    this.editComment = this.editComment.bind(this);
    this.removeComment = this.removeComment.bind(this);
  }

  componentDidMount() {
    this.getBrandDetail(this.state.brandId);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.upvotes !== nextProps.upvotes) {
      this.getBrandDetail(nextProps.match.params.brandId);
    }
    if (nextProps.match.params.brandId !== this.props.match.params.brandId) {
      this.getBrandDetail(nextProps.match.params.brandId);
    }
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
        this.props.dispatch(profileActions.newBrandProfile(res.data.upvotes));
      })
      .catch(err => console.log(err));
  }

  submitComment({ newComment }) {
    axios.post(`/api/brands/${this.state.brandId}/comments`, {
      text: newComment,
      user_id: this.props.user.id,
      brand_id: this.state.brandId,
    })
      .then(({ data }) => {
        const newBrand = Object.assign({}, this.state.brand, {
          brand_comments: [data, ...this.state.brand.brand_comments],
        });
        this.setState({ brand: newBrand });
      })
      .catch(e => console.log('Error adding comment', e));
  }

  editComment(text, commentId, idx) {
    axios.put(`/api/brands/${this.state.brandId}/comments/${commentId}`, { text })
      .then(({ data }) => {
        const newBrand = Object.assign({}, this.state.brand, {
          brand_comments: [
            ...this.state.brand.brand_comments.slice(0, idx),
            data,
            ...this.state.brand.brand_comments.slice(idx + 1),
          ],
        });
        this.setState({ brand: newBrand });
      })
      .catch(e => console.log('Error adding comment', e));
  }

  removeComment(commentId, idx) {
    axios.delete(`/api/brands/${this.state.brandId}/comments/${commentId}`)
      .then(() => {
        const newBrand = Object.assign({}, this.state.brand, {
          brand_comments: _.filter(this.state.brand.brand_comments, (com, i) => i !== idx),
        });
        this.setState({ brand: newBrand });
      })
      .catch(e => console.log('Error removing comment:', e));
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
            user={this.props.user}
            trucks={this.state.brand.trucks}
            upvotes={this.props.upvotes}
          />
          <TabView
            brand={this.state.brand}
            brandId={this.state.brandId}
            brandName={this.state.brand.name}
            comments={this.state.brand.brand_comments}
            trucks={this.state.brand.trucks}
            userId={this.props.user.id}
            removeComment={this.removeComment}
            editComment={this.editComment}
            markers={this.state.markers}
            getBrand={this.getBrandDetail}
            menuItems={this.state.brand.menu_items}
            submitComment={this.submitComment}
          />
        </Row>
      </Grid>
    );
  }
}

Profile.propTypes = {
  match: propSchema.match,
  user: propSchema.user,
  upvotes: propSchema.upvotes,
  dispatch: propSchema.dispatch,
};

const mapStateToProps = ({ user, profile }) => ({
  user,
  profile,
});

const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
