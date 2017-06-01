import React from 'react';
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
  switch (props.match.path) {
    case '/map':
      callback = () => props.dispatch(mapActions.mapTruckUpvoteReq(dispatchOptions, props.brand_id, props.idx));
      upvoteCount = props.mapUpvotes.length;
      break;
    case '/brand/:brandId':
      callback = () => props.dispatch(profileActions.profileUpvoteReq(props.user.id, props.brand_id));
      upvoteCount = props.upvotes.length;
      break;
    default:
      return null;
  }

  return (
    <div>
      <button onClick={callback} disabled={!props.isLoggedIn}>Upvote</button>
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
  dispatch: propSchema.dispatch,
  user: propSchema.user,
  brand_id: propSchema.brandId,
  isLoggedIn: propSchema.isLoggedIn,
  upvotes: propSchema.upvotes,
  mapUpvotes: propSchema.mapUpvotes,
  match: propSchema.match,
  timeline_id: propSchema.timeline_id,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Upvote));
