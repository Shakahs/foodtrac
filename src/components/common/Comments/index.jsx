import React from 'react';
import { connect } from 'react-redux';
import propSchema from '../PropTypes';
import CommentInput from './CommentsInput';
import CommentsList from './CommentsList';
import './index.scss';

const CommentsView = props => (
  <div>
    {
      (props.auth.isLoggedIn)
      ? <CommentInput onSubmit={props.submitComment} name="newComment" />
      : null
    }
    <CommentsList
      comments={props.comments}
      user={props.user}
      removeComment={props.removeComment}
      editComment={props.editComment}
    />
  </div>
);

CommentsView.propTypes = {
  user: propSchema.user,
  auth: propSchema.auth,
  submitComment: propSchema.func,
  comments: propSchema.comments,
  removeComment: propSchema.removeComment,
  editComment: propSchema.editComment,
};

const mapStateToProps = state => ({
  user: state.user,
  auth: state.auth,
});

CommentsView.propTypes = {
  isLoggedIn: propSchema.isLoggedIn,
};

export default connect(mapStateToProps, null)(CommentsView);
