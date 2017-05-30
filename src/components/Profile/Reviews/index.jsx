import React from 'react';
import ReviewEntry from './ReviewCreate';
import ReviewList from './ReviewList';

function submitReview(data) {
  console.log(data);
}

class ReviewMain extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reviews: [],
    };
  }

  componentWillMount() {
    this.setState({
      reviews: [
        {
          title: 'a good review',
          text: 'was a good place to eat',
        },
      ],
    });
  }

  render() {
    return (
      <div>
        <ReviewEntry onSubmit={submitReview} />
        <ReviewList reviews={this.state.reviews} />
      </div>
    );
  }
}

export default ReviewMain;
