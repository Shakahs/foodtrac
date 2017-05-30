import React from 'react';
import { Grid } from 'react-flexbox-grid';
import ReviewEntry from './ReviewEntry';

// change tempArr with arrays of reviews
const tempArr = [];

const ReviewsList = () => (
  <Grid fluid>
    {tempArr.lenght > 0 ?
      tempArr.map(review => <ReviewEntry review={review} />)
    :
      <div className="noItems">No Reviews</div>
    }
  </Grid>
);

export default ReviewsList;
