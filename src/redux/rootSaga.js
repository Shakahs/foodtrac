import { fork } from 'redux-saga/effects';
import { sagas as mapSagas } from './MapSearch';
import { sagas as userSagas } from './user';
import { sagas as authSagas } from './auth';

export default function* rootSaga() {
  yield [
    fork(userSagas),
    fork(mapSagas),
    fork(authSagas.watchLoginRequest),
  ];
}
