import { call, put, take } from 'redux-saga/effects';
import axios from 'axios';
import { actions } from './index';

// eager load brand info to return with trucks and display in trucksentries
// keep original information in store as well to use in truckslist
function* mapRequest(lat, lng, dist) {
  try {
    const { data } = yield call(axios.get, `/api/foodtrucks?lat=${lat}&lng=${lng}&dist=${dist || 50}`);
    const markers = data.reduce((arr, location) => {
      const curr = arr;
      if (location.trucks.length === 0) {
        return curr;
      }
      curr.push({
        position: {
          lat: location.lat,
          lng: location.lng,
        },
        key: location.id,
        defaultAnimation: 2,
      });
      return curr;
    }, []);
    console.log(markers);

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

