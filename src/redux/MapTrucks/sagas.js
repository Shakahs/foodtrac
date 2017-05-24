import { call, put, take } from 'redux-saga/effects';
import axios from 'axios';
import { actions } from './index';

function* onMapTrucksSuccess(mapTrucks) {
  yield put(actions.mapTrucksSuccess(mapTrucks));
}

function* mapTrucksRequest(location) {
  const { data } = yield call(axios.get, `/api/foodtrucks?lat=${location.lat}&lng=${location.lng}`);
  yield call(onMapTrucksSuccess, data);
}

export default function* watchMapTrucksRequest() {
  while (true) {
    const { location } = yield take(actions.MAP_TRUCKS_REQUEST);
    yield call(mapTrucksRequest, location);
  }
}
