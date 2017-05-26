import { call, put, take } from 'redux-saga/effects';
import axios from 'axios';
import { actions } from './index';

function* foodGenresRequest() {
  try {
    const { data } = yield call(axios.get, '/api/foodgenres');
    yield put(actions.foodGenresSuccess(data));
  } catch (e) {
    yield put(actions.foodGenresFailure(e));
  }
}

export default function* watchFoodGenresRequest() {
  while (true) {
    yield take(actions.FOODGENRES_REQUEST);
    yield call(foodGenresRequest);
  }
}
