import { fork } from 'redux-saga/effects';

import { sagas as userSagas } from './UserProfile';

export default function* rootSaga() {
  yield [
    fork(userSagas),
  ];
}
