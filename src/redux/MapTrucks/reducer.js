export const MAP_TRUCKS_REQUEST = 'MAP_TRUCKS_REQUEST';
export const MAP_TRUCKS_SUCCESS = 'MAP_TRUCKS_SUCCESS';
export const MAP_TRUCKS_FAILURE = 'MAP_TRUCKS_FAILURE';

const intitialState = {
  mapTrucks: null,
  error: null,
  fetching: false,
};

export default function reducer(state = intitialState, action) {
  switch (action.type) {
    case MAP_TRUCKS_REQUEST:
      return Object.assign({}, state, { fetching: true });
    case MAP_TRUCKS_SUCCESS:
      return Object.assign({}, state, { fetching: false, mapTrucks: action.mapTrucks });
    case MAP_TRUCKS_FAILURE:
      return Object.assign({}, state, { fetching: false, error: action.error });
    default:
      return state;
  }
}

export const mapTrucksRequest = location => ({
  type: MAP_TRUCKS_REQUEST,
  location,
});

export const mapTrucksSuccess = mapTrucks => ({
  type: MAP_TRUCKS_SUCCESS,
  mapTrucks,
});

export const mapTrucksFailure = error => ({
  type: MAP_TRUCKS_FAILURE,
  error,
});
