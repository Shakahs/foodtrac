import React from 'react';

const ReviewsListEntry = props => (
  <div>
    {props.review.title}
    <br />
    {props.review.text}
  </div>
);

export default ReviewsListEntry;
