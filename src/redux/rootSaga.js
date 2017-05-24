import { fork } from 'redux-saga/effects';

import { sagas as userSagas } from './UserProfile';
import { sagas as mapSagas } from './MapSearch';

export default function* rootSaga() {
  yield [
    fork(userSagas),
    fork(mapSagas),
  ];
}
