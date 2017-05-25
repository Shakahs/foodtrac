import { call, put, take } from 'redux-saga/effects';
import axios from 'axios';
import { actions } from './index';
import { actions as authActions } from '../auth';

export default function* watchLoginSuccess() {
  while (true) {
    const { profileData } = yield take(authActions.LOGIN_SUCCESS);
    const userId = profileData.identities[0].user_id;
    const userData = yield call(axios.get, `/api/users/${userId}`);
    yield put(actions.userReceived(userData.data));
  }
}

