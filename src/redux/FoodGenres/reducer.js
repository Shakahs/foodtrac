export const FOODGENRES_REQUEST = 'FOODGENRES_REQUEST';
export const FOODGENRES_SUCCESS = 'FOODGENRES_SUCCESS';
export const FOODGENRES_FAILURE = 'FOODGENRES_FAILURE';

const initialState = {
  foodGenres: null,
  error: null,
  fetching: false,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case FOODGENRES_REQUEST:
      return Object.assign({}, state, { fetching: true });
    case FOODGENRES_SUCCESS:
      return Object.assign({}, state, {
        fetching: false,
        foodGenres: action.foodGenres,
      });
    case FOODGENRES_FAILURE:
      return Object.assign({}, state, { fetching: false, error: action.error });
    default:
      return state;
  }
}

export const foodGenresRequest = () => ({
  type: FOODGENRES_REQUEST,
});

export const foodGenresSuccess = foodGenres => ({
  type: FOODGENRES_SUCCESS,
  foodGenres,
});

export const foodGenresFailure = error => ({
  type: FOODGENRES_FAILURE,
  error,
});
