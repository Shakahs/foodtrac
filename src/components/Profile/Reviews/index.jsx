import React from 'react';
import ReviewEntry from './ReviewEntry';
import ReviewList from './ReviewList';

function submitReview(data) {
  console.log(data);
}

const ReviewMain = () => (
  <div>
    <ReviewEntry onSubmit={submitReview} />
    <ReviewList />
  </div>
);

export default ReviewMain;
