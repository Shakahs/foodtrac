import React from 'react';
import { Grid } from 'react-flexbox-grid';
import _ from 'lodash';
import PropTypes from 'prop-types';
import ReviewListEntry from './ReviewListEntry';
import propSchema from '../../common/PropTypes';

const ReviewsList = props => (
  <Grid fluid>
    {props.reviews && props.reviews.length > 0 ?
      _.map(props.reviews, review => <ReviewListEntry review={review} />)
      :
      <div className="noItems">No Reviews</div>
    }
  </Grid>
);
ReviewsList.propTypes = {
  reviews: PropTypes.arrayOf(propSchema.review),
};


export default ReviewsList;
