import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
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
  }

  componentDidMount() {
    // this.setState({
    //   reviews: [
    //     {
    //       title: 'a good review',
    //       text: 'was a good place to eat',
    //     },
    //   ],
    // });
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


  render() {
    return (
      <div>
        <p>Reviews</p>
        <ReviewEntry onSubmit={this.submitReview} updateReviewScore={this.updateReviewScore} />
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
