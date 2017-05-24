import { call, put, take } from 'redux-saga/effects';
import axios from 'axios';
import { actions } from './index';

function* userRequest(userId) {
  try {
    const { data } = yield call(axios.get, `/api/users/${userId}`);
    yield put(actions.userSuccess(data[0]));
  } catch (e) {
    yield put(actions.userFailure(e));
  }
}

export default function* watchUserRequest() {
  while (true) {
    const { userId } = yield take(actions.USER_REQUEST);
    yield call(userRequest, userId);
  }
}

