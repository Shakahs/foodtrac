import React from 'react';
import StarRatingComponent from 'react-star-rating-component';
import moment from 'moment';

import propSchema from '../../common/PropTypes';
import './ReviewListEntry.scss';

const ReviewsListEntry = props => (
  <div className="ReviewListEntry">
    <div>
      {moment.utc(props.review.created_at).local().calendar()}
    </div>
    <div>
      User {props.review.user_id}: {props.review.title}
    </div>
    <div>
      <StarRatingComponent
        value={props.review.score}
        editing={false}
      />
    </div>
    <div>
      {props.review.text}
    </div>
  </div>
);

ReviewsListEntry.propTypes = {
  review: propSchema.review,
};

export default ReviewsListEntry;
