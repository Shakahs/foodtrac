import React from 'react';
import propSchema from '../common/PropTypes';
import CommentInput from './CommentInput';
import CommentsList from './CommentsList';

const CommentsView = props => (
  <div>
    <CommentInput onSubmit={props.submitComment} name="newComment" />
    <CommentsList
      comments={props.comments}
      userId={props.userId}
      removeComment={props.removeComment}
      editComment={props.editComment}
    />
  </div>
);

CommentsView.propTypes = {
  submitComment: propSchema.func,
  userId: propSchema.userId,
  comments: propSchema.comments,
  removeComment: propSchema.removeComment,
  editComment: propSchema.editComment,
};

export default CommentsView;
