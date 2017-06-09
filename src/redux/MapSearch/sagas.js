import { call, put, take } from 'redux-saga/effects';
import axios from 'axios';
import { actions } from './index';
import { actions as loadingActions } from '../Loading';

function* mapRequest(lat, lng, dist, foodGenre) {
  try {
    yield put(loadingActions.startLoading());
    const { data } = yield call(axios.get, `/api/foodtrucks?lat=${lat}&lng=${lng}&dist=${dist || 40}&foodGenre=${foodGenre}`);
    data.sort((a, b) => b.brands.upvotes.length - a.brands.upvotes.length);
    yield put(loadingActions.endLoading());
    yield put(actions.mapSuccess(data, { lat, lng }));
  } catch (e) {
    yield put(actions.mapFailure(e));
  }
}

function* mapTruckUpvoteReq(options, brandId, idx) {
  // options = { user_id, timeline_id }
  const { data } = yield call(axios.post, `/api/brands/${brandId}/upvote`, options);
  yield put(actions.mapTruckUpvote(idx, data));
}

export function* watchMapTruckUpvoteReq() {
  while (true) {
    const { options, brandId, idx } = yield take(actions.MAP_TRUCK_UPVOTE_REQ);
    yield call(mapTruckUpvoteReq, options, brandId, idx);
  }
}

export function* watchMapRequest() {
  while (true) {
    const { lat, lng, dist, foodGenre } = yield take(actions.MAP_REQUEST);
    yield call(mapRequest, lat, lng, dist, foodGenre);
  }
}

