import { call, put, take } from 'redux-saga/effects';
import axios from 'axios';
import { actions } from './index';
import { actions as authActions } from '../auth';

export default function* watchLoginSuccess() {
  while (true) {
    const { profileData } = yield take(authActions.LOGIN_SUCCESS);
    const postData = { auth0_id: profileData.user_id };
    postData.is_truck_owner = (profileData.user_metadata &&
      profileData.user_metadata.signed_up_as_truck_owner &&
      Boolean(Number(profileData.user_metadata.signed_up_as_truck_owner)));
    const userData = yield call(axios.post, '/api/users/', postData);
    userData.data.is_truck_owner = Boolean(userData.data.is_truck_owner);
    yield put(actions.userReceived(userData.data));
    if (userData.data.is_truck_owner) {
      yield put(actions.redirectAddBrandEnable());
    }
  }
}
