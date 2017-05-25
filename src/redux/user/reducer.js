import { REHYDRATE } from 'redux-persist/constants';
import { actions as authActions } from '../auth';

const Immutable = require('seamless-immutable').static;

export const USER_RECEIVED = 'USER_RECEIVED';
export const USER_FAILURE = 'USER_FAILURE';

const initialState = {
  userId: null,
  email: null,
  isTruckOwner: false,
};

export default function reducer(state = Immutable(initialState), action) {
  switch (action.type) {
    case REHYDRATE:
      if (action.payload.user) return Immutable.merge(state, action.payload.user);
      return state;
    case USER_RECEIVED:
      return Immutable.merge(state, {
        userId: action.user.id,
        email: action.user.email,
        isTruckOwner: action.user.is_truck_owner,
      });
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
