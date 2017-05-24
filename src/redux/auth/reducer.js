import { REHYDRATE } from 'redux-persist/constants';

const Immutable = require('seamless-immutable').static;

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT = 'LOGOUT';
export const CREDENTIALS_ENTERED = 'CREDENTIALS_ENTERED';

const initialState = {
  isLoggedIn: false,
  isLoggingIn: false,
  error: null,
  tokenData: null,
  profileData: null,
};

export default function reducer(state = Immutable(initialState), action) {
  switch (action.type) {
    case REHYDRATE:
      if (action.payload.auth) return Immutable.merge(state, action.payload.auth);
      return state;
    case LOGIN_REQUEST:
      return Immutable.merge(state, { isLoggingIn: true });
    case LOGIN_SUCCESS:
      return Immutable.merge(state, {
        isLoggedIn: true,
        isLoggingIn: false,
        tokenData: action.tokenData,
        profileData: action.profileData,
      });
    case LOGIN_FAILURE:
      return Immutable.merge(state, {
        isLoggedIn: false,
        isLoggingIn: false,
        error: action.error,
        tokenData: null,
        profileData: null,
      });
    case LOGOUT:
      return Immutable(initialState);
    default:
      return state;
  }
}

export const loginRequest = credential => (
  {
    type: LOGIN_REQUEST,
    credential,
  }
);

export const loginSuccess = (tokenData, profileData) => (
  {
    type: LOGIN_SUCCESS,
    tokenData,
    profileData,
  }
);

export const loginFailure = error => (
  {
    type: LOGIN_FAILURE,
    error,
  }
);

export const logout = () => (
  {
    type: LOGOUT,
  }
);
