import { fork } from 'redux-saga/effects';
import { sagas as mapSagas } from './MapSearch';
import { sagas as userSagas } from './user';
import { sagas as authSagas } from './auth';
import { sagas as foodGenresSagas } from './FoodGenres';

export default function* rootSaga() {
  yield [
    fork(userSagas),
    fork(mapSagas),
    fork(authSagas.watchCreateAccount),
    fork(authSagas.watchLoginRequest),
    fork(foodGenresSagas),
  ];
}
