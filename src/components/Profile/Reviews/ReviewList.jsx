import React from 'react';
import { Grid } from 'react-flexbox-grid';
import _ from 'lodash';
import ReviewListEntry from './ReviewListEntry';

const ReviewsList = props => (
  <Grid fluid>
    {props.reviews.length > 0 ?
      _.map(props.reviews, review => <ReviewListEntry review={review} />)
      :
      <div className="noItems">No Reviews</div>
    }
  </Grid>
);

export default ReviewsList;
