import { call, put, take } from 'redux-saga/effects';
import axios from 'axios';
import { actions } from './index';

function* mapRequest(lat, lng, dist) {
  try {
    const { data } = yield call(axios.get, `/api/foodtrucks?lat=${lat}&lng=${lng}&dist=${dist || 50}`);
    const markers = data.map(location => ({
      position: {
        lat: location.lat,
        lng: location.lng,
      },
      key: location.id,
      defaultAnimation: 2,
    }));

    yield put(actions.mapSuccess(markers));
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

