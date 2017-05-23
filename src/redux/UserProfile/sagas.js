import { call, put, take } from 'redux-saga/effects';
import axios from 'axios';
import { actions } from './index';

function* onUserSuccess(user) {
  yield put(actions.userSuccess(user));
}

function* userRequest(userId) {
  const { data } = yield call(axios.get, `/api/users/${userId}`);
  yield call(onUserSuccess, data[0]);
}

export default function* watchUserRequest() {
  while (true) {
    const { userId } = yield take(actions.USER_REQUEST);
    yield call(userRequest, userId);
  }
}

