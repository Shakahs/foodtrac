import { call, put, take } from 'redux-saga/effects';
import axios from 'axios';
import { actions } from './index';
import { actions as authActions } from '../auth';

const moment = require('moment');

export function* watchRequestUserData() {
  while (true) {
    const { id } = yield take(actions.USER_DATA_REQUESTED);
    try {
      const { data } = yield call(axios.get, `/api/users/${id}`);
      yield put(actions.userReceived(data));
    } catch (err) {
      console.log('Error fetching user data:', err);
    }
  }
}

export function* watchBecomeOwnerReq() {
  while (true) {
    const { id } = yield take(actions.USER_BECOME_OWNER_REQ);
    const { data } = yield call(axios.put, `/api/users/${id}`, { is_truck_owner: true });
    yield put(actions.userReceived(data));
  }
}

export function* watchLoginSuccess() {
  while (true) {
    const { profileData } = yield take(authActions.LOGIN_SUCCESS);
    const postData = { auth0_id: profileData.user_id };
    postData.is_truck_owner = (Boolean(Number(profileData.user_metadata.signed_up_as_truck_owner)));
    const userData = yield call(axios.post, '/api/users/', postData);
    userData.data.is_truck_owner = Boolean(userData.data.is_truck_owner);
    yield put(actions.userReceived(userData.data));
    if (userData.data.is_truck_owner &&
      moment(profileData.created_at).isAfter(moment().subtract(10, 'seconds'))) {
      yield put(actions.redirectAddBrandEnable());
    }
  }
}

export function* watchAddBrandRequest() {
  while (true) {
    const { body } = yield take(actions.ADD_BRAND_REQUEST);
    const { data } = yield call(axios.post, '/api/brands', body);
    yield put(actions.addBrand(data));
  }
}
