import { REHYDRATE } from 'redux-persist/constants';
import { actions as authActions } from '../auth';

const Immutable = require('seamless-immutable').static;

export const USER_RECEIVED = 'USER_RECEIVED';
export const USER_FAILURE = 'USER_FAILURE';

const initialState = {
  id: null,
  email: null,
  is_truck_owner: false,
  auth0_id: false,
  // TODO: remove password later
  dummy_password: null,
  user_follows: [],
  brands: [],
};

export default function reducer(state = Immutable(initialState), action) {
  switch (action.type) {
    case REHYDRATE:
      if (action.payload.user) return Immutable.merge(state, action.payload.user);
      return state;
    case USER_RECEIVED:
      return Immutable.merge(state, action.user);
    // case USER_FAILURE:
    //   return Object.assign({}, state, { fetching: false, error: action.error });
    case authActions.LOGOUT:
      return Immutable(initialState);
    default:
      return state;
  }
}

export const userReceived = user => ({
  type: USER_RECEIVED,
  user,
});

// export const userFailure = error => ({
//   type: USER_FAILURE,
//   error,
// });
