import { call, put, take } from 'redux-saga/effects';
import axios from 'axios';
import { actions } from './index';

function* mapRequest(lat, lng, dist) {
  try {
    const { data } = yield call(axios.get, `/api/foodtrucks?lat=${lat}&lng=${lng}&dist=${dist || 40}`);
    data.sort((a, b) => b.brands.upvotes.length - a.brands.upvotes.length);
    const markers = data.map(({ locations }) => ({
      position: {
        lat: locations.lat,
        lng: locations.lng,
      },
      key: locations.id,
      defaultAnimation: 2,
    }), []);

    yield put(actions.mapSuccess(markers, data));
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
    const { lat, lng } = yield take(actions.MAP_REQUEST);
    yield call(mapRequest, lat, lng);
  }
}

