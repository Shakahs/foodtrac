import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';
import ReviewEntry from './ReviewCreate';
import ReviewList from './ReviewList';
import propSchema from '../../common/PropTypes';

class ReviewMain extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newReviewScore: 5,
    };

    this.submitReview = this.submitReview.bind(this);
    this.updateReviewScore = this.updateReviewScore.bind(this);
    this.didUserAlreadyReview = this.didUserAlreadyReview.bind(this);
  }

  submitReview(data) {
    const newReviewObject = Object.assign({}, data);
    newReviewObject.brand_id = this.props.match.params.brandId;
    newReviewObject.user_id = this.props.user.id;
    newReviewObject.score = this.state.newReviewScore;
    axios.post('/api/reviews/', newReviewObject)
      .then(() => {
        this.props.getBrand(this.props.brand.id);
      });
  }

  updateReviewScore(nextValue) {
    this.setState({ newReviewScore: nextValue });
  }

  didUserAlreadyReview() {
    return _.some(this.props.brand.brand_reviews, ['user_id', this.props.user.id]);
  }

  render() {
    return (
      <div>
        <p>Reviews</p>
        {this.props.user.id && !this.didUserAlreadyReview() ?
          <ReviewEntry onSubmit={this.submitReview} updateReviewScore={this.updateReviewScore} />
          : <p>Thank you for your review!</p> }
        <ReviewList reviews={this.props.brand.brand_reviews} />
      </div>
    );
  }
}

ReviewMain.propTypes = {
  user: propSchema.user,
  match: propSchema.match,
  brand: propSchema.brand,
  getBrand: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  user: state.user,
});


export default connect(mapStateToProps)(ReviewMain);
