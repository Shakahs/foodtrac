import { actions as authActions } from '../auth';

export const REGISTERED_SERVICE_WORKER = 'REGISTERED_SERVICE_WORKER';
export const SUBSCRIBE_PUSH = 'SUBSCRIBE_PUSH';
export const UNSUBSCRIBE_PUSH = 'UNSUBSCRIBE_PUSH';

const initialState = {
  swReg: null,
  subscription: null,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case REGISTERED_SERVICE_WORKER:
      return Object.assign({}, state, { swReg: action.swReg, subscription: action.subscription });
    case SUBSCRIBE_PUSH:
    case UNSUBSCRIBE_PUSH:
      return Object.assign({}, state, { subscription: action.subscription });
    case authActions.LOGOUT:
      if (state.subscription) {
        state.subscription.unsubscribe();
      }
      return state;
    default:
      return state;
  }
}

export const registeredServiceWorker = (swReg, subscription) => ({
  type: REGISTERED_SERVICE_WORKER,
  swReg,
  subscription,
});

export const subscribePush = (subscription, userId) => ({
  type: SUBSCRIBE_PUSH,
  subscription,
  userId,
});

export const unsubscribePush = userId => ({
  type: UNSUBSCRIBE_PUSH,
  subscription: null,
  userId,
});
