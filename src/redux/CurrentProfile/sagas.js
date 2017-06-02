import { call, put, take } from 'redux-saga/effects';
import axios from 'axios';
import { actions } from './index';

function* profileUpvoteReq(userId, brandId) {
  // options = { user_id, timeline_id }
  const options = {
    user_id: userId,
  };
  const { data } = yield call(axios.post, `/api/brands/${brandId}/upvote`, options);
  yield put(actions.newUpvote(data));
}

export default function* watchProfileUpvoteReq() {
  while (true) {
    const { userId, brandId } = yield take(actions.PROFILE_UPVOTE_REQ);
    yield call(profileUpvoteReq, userId, brandId);
  }
}
