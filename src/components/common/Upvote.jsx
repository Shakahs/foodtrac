import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { actions as mapActions } from '../../redux/MapSearch';
import { actions as profileActions } from '../../redux/CurrentProfile';
import propSchema from './PropTypes';

const Upvote = (props) => {
  const dispatchOptions = { user_id: props.user.id };
  if (props.timeline_id) {
    dispatchOptions.timeline_id = props.timeline_id;
  }

  let callback;
  let upvoteCount;
  let disabled;
  const now = new Date();
  switch (props.match.path) {
    case '/map':
      callback = () => props.dispatch(mapActions.mapTruckUpvoteReq(dispatchOptions, props.brand_id, props.idx));
      upvoteCount = props.mapUpvotes.length;
      disabled = !props.isLoggedIn || _.some(props.mapUpvotes, upvote => upvote.user_id === props.user.id);
      break;
    case '/brand/:brandId':
      callback = () => props.dispatch(profileActions.profileUpvoteReq(props.user.id, props.brand_id));
      upvoteCount = props.upvotes.length;
      disabled = !props.isLoggedIn ||
        _.some(props.upvotes, upvote =>
          // if user has upvoted already
          upvote.user_id === props.user.id &&
          // within the last 24 hours
          now - new Date(upvote.date) < 86400000 &&
          // and the upvote did not come from a map entry
          !Object.prototype.hasOwnProperty.call(upvote, 'timeline_id'));
      break;
    default:
      return null;
  }

  return (
    <div>
      <button onClick={callback} disabled={disabled}>Upvote</button>
      <span>{upvoteCount}</span>
    </div>
  );
};

const mapStateToProps = ({ auth, user, profile }) => {
  const isLoggedIn = auth.isLoggedIn;
  return { isLoggedIn, user, upvotes: profile.upvotes };
};

const mapDispatchToProps = dispatch => ({ dispatch });

Upvote.propTypes = {
  user: propSchema.user,
  isLoggedIn: propSchema.isLoggedIn,
  upvotes: propSchema.upvotes,
  mapUpvotes: propSchema.mapUpvotes,
  match: propSchema.match,
  timeline_id: propSchema.timeline_id,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Upvote));
