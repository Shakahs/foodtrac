import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import ReviewEntry from './ReviewCreate';
import ReviewList from './ReviewList';
import propSchema from '../../common/PropTypes';

class ReviewMain extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reviews: [],
    };

    this.submitReview = this.submitReview.bind(this);
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
    newReviewObject.score = 1;
    console.log('tosubmit', newReviewObject);
    axios.post('/api/reviews/', newReviewObject)
      .then(() => {
        this.setState({
          reviews: [...this.state.reviews, newReviewObject],
        });
      });
  }


  render() {
    return (
      <div>
        <ReviewEntry onSubmit={this.submitReview} />
        <ReviewList reviews={this.state.reviews} />
      </div>
    );
  }
}

ReviewMain.propTypes = {
  user: propSchema.user,
  match: propSchema.match,
};

const mapStateToProps = state => ({
  user: state.user,
});


export default connect(mapStateToProps)(ReviewMain);
