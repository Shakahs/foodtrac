
export const USER_REQUEST = 'USER_REQUEST';
export const USER_SUCCESS = 'USER_SUCCESS';
export const USER_FAILURE = 'USER_FAILURE';

const initialState = {
  user: null,
  error: null,
  fetching: false,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case USER_REQUEST:
      return Object.assign({}, state, { fetching: true });
    case USER_SUCCESS:
      return Object.assign({}, state, { fetching: false, user: action.user });
    case USER_FAILURE:
      return Object.assign({}, state, { fetching: false, error: action.error });
    default:
      return state;
  }
}

export const userRequest = userId => ({
  type: USER_REQUEST,
  userId,
});

export const userSuccess = user => ({
  type: USER_SUCCESS,
  user,
});

export const userFailure = error => ({
  type: USER_FAILURE,
  error,
});
