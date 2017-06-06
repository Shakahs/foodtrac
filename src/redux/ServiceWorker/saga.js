import { call, take } from 'redux-saga/effects';
import axios from 'axios';
import { actions } from './index';

export function* watchSubscribePush() {
  while (true) {
    const { subscription, userId } = yield take(actions.SUBSCRIBE_PUSH);
    yield call(axios.post, `/api/users/${userId}/push`, { subscription: JSON.stringify(subscription) });
  }
}

export function* watchUnsubscribePush() {
  while (true) {
    const { userId } = yield take(actions.UNSUBSCRIBE_PUSH);
    yield call(axios.delete, `/api/users/${userId}/push`);
  }
}

