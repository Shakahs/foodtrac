import React from 'react';
import _ from 'lodash';
import { Grid } from 'react-flexbox-grid';
import propSchema from '../common/PropTypes';
import CommentEntry from '../common/CommentEntry';

// change tempArr with arrays of menu items

const CommentsList = props => (
  <Grid fluid>
    {props.comments.length > 0 ?
      _.map(props.comments, (comment, idx) =>
        (<CommentEntry
          comment={comment}
          key={idx}
          idx={idx}
          userId={props.userId}
          removeComment={props.removeComment}
          editComment={props.editComment}
        />))
    :
      <div className="noItems">No Comments</div>
    }
  </Grid>
);

CommentsList.propTypes = {
  comments: propSchema.comments,
  editComment: propSchema.editComment,
};

export default CommentsList;
