import { fork } from 'redux-saga/effects';

import { sagas as userSagas } from './UserProfile';
import { sagas as mapSagas } from './MapSearch';
import { sagas as mapTrucksSagas } from './MapTrucks';

export default function* rootSaga() {
  yield [
    fork(userSagas),
    fork(mapSagas),
    fork(mapTrucksSagas),
  ];
}
