
export const MAP_REQUEST = 'MAP_REQUEST';
export const MAP_SUCCESS = 'MAP_SUCCESS';
export const MAP_FAILURE = 'MAP_FAILURE';

const initialState = {
  markers: [],
  trucks: [],
  error: null,
  fetching: false,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case MAP_REQUEST:
      return Object.assign({}, state, { fetching: true });
    case MAP_SUCCESS:
      return Object.assign({}, state, {
        fetching: false,
        markers: action.markers,
        trucks: action.trucks,
      });
    case MAP_FAILURE:
      return Object.assign({}, state, { fetching: false, error: action.error });
    default:
      return state;
  }
}

export const mapRequest = (lat, lng, dist) => ({
  type: MAP_REQUEST,
  lat,
  lng,
  dist,
});

export const mapSuccess = (markers, trucks) => ({
  type: MAP_SUCCESS,
  markers,
  trucks,
});

export const mapFailure = error => ({
  type: MAP_FAILURE,
  error,
});
