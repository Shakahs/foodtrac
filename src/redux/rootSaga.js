import { fork } from 'redux-saga/effects';
import { sagas as mapSagas } from './MapSearch';
import { sagas as userSagas } from './user';

export default function* rootSaga() {
  yield [
    fork(userSagas),
    fork(mapSagas),
  ];
}
