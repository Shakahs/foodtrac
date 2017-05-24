import React from 'react';
import { Grid } from 'react-flexbox-grid';
import CommentEntry from '../common/CommentEntry';

// change tempArr with arrays of menu items
const tempArr = [];

const CommentsList = () => (
  <Grid fluid>
    {tempArr.lenght > 0 ?
      tempArr.map(comment => <CommentEntry comment={comment} />)
    :
      <div className="noItems">No Comments</div>
    }
  </Grid>
);

export default CommentsList;
