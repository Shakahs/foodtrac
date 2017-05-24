const Immutable = require('seamless-immutable').static;

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT = 'LOGOUT';
export const CREDENTIALS_ENTERED = 'CREDENTIALS_ENTERED';

const initialState = {
  isLoggingIn: false,
  idToken: null,
  profile: null,
  error: null,
};

export default function reducer(state = Immutable(initialState), action) {
  switch (action.type) {
    case LOGIN_REQUEST:
      return state.set('isLoggingIn', true);
    case LOGIN_SUCCESS:
      return state.merge({
        isLoggingIn: false,
        idToken: action.idToken,
        profile: action.profile,
      });
    case LOGIN_FAILURE:
      return state.merge({
        isLoggingIn: false,
        idToken: null,
        profile: null,
        error: action.error,
      });
    case LOGOUT:
      return initialState;
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

export const loginSuccess = (profile, idToken) => (
  {
    type: LOGIN_SUCCESS,
    profile,
    idToken,
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
