import { call, put, take } from 'redux-saga/effects';
import axios from 'axios';
import { actions } from './index';

// eager load brand info to return with trucks and display in trucksentries
// keep original information in store as well to use in truckslist
function* mapRequest(lat, lng, dist) {
  try {
    const { data } = yield call(axios.get, `/api/foodtrucks?lat=${lat}&lng=${lng}&dist=${dist || 50}`);
    const markers = data.map(({ locations }) => ({
      position: {
        lat: locations[0].lat,
        lng: locations[0].lng,
      },
      key: locations[0].id,
      defaultAnimation: 2,
    }), []);

    yield put(actions.mapSuccess(markers, data));
  } catch (e) {
    yield put(actions.mapFailure(e));
  }
}

export default function* watchMapRequest() {
  while (true) {
    const { lat, lng } = yield take(actions.MAP_REQUEST);
    yield call(mapRequest, lat, lng);
  }
}

