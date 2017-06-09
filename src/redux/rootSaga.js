import { fork } from 'redux-saga/effects';
import { sagas as mapSagas } from './MapSearch';
import { sagas as userSagas } from './user';
import { sagas as authSagas } from './auth';
import { sagas as swSagas } from './ServiceWorker';
import { sagas as profileSagas } from './CurrentProfile';
import { sagas as foodGenresSagas } from './FoodGenres';

export default function* rootSaga() {
  yield [
    fork(userSagas.watchLoginSuccess),
    fork(userSagas.watchAddBrandRequest),
    fork(userSagas.watchBecomeOwnerReq),
    fork(userSagas.watchRequestUserData),
    fork(swSagas.watchSubscribePush),
    fork(swSagas.watchUnsubscribePush),
    fork(swSagas.watchLogout),
    fork(mapSagas.watchMapRequest),
    fork(mapSagas.watchMapTruckUpvoteReq),
    fork(profileSagas),
    fork(authSagas.watchCreateAccount),
    fork(authSagas.watchLoginRequest),
    fork(foodGenresSagas),
  ];
}
