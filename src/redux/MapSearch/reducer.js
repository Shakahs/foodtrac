import _ from 'lodash';

export const MAP_REQUEST = 'MAP_REQUEST';
export const MAP_SUCCESS = 'MAP_SUCCESS';
export const MAP_FAILURE = 'MAP_FAILURE';
export const MAP_TRUCK_UPVOTE_REQ = 'MAP_TRUCK_UPVOTE_REQ';
export const MAP_TRUCK_UPVOTE = 'MAP_TRUCK_UPVOTE';

const initialState = {
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
        trucks: action.trucks,
      });
    case MAP_FAILURE:
      return Object.assign({}, state, { fetching: false, error: action.error });
    case MAP_TRUCK_UPVOTE_REQ:
      return Object.assign({}, state, { fetching: true });
    case MAP_TRUCK_UPVOTE: // eslint-disable-line no-case-declarations
      const trucks = _.map(state.trucks, truck => Object.assign({}, truck));
      const currTruckUpvotes = _.map(state.trucks[action.idx].brands.upvotes, upvote => Object.assign({}, upvote));
      currTruckUpvotes.push(action.upvote);
      trucks[action.idx].brands.upvotes = currTruckUpvotes;
      return Object.assign({}, state, {
        fetching: false,
        trucks,
      });
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

export const mapTruckUpvoteReq = (options, brandId, idx) => ({
  type: MAP_TRUCK_UPVOTE_REQ,
  options,
  brandId,
  idx,
});

export const mapTruckUpvote = (idx, upvote) => ({
  type: MAP_TRUCK_UPVOTE,
  idx,
  upvote,
});

export const mapSuccess = trucks => ({
  type: MAP_SUCCESS,
  trucks,
});

export const mapFailure = error => ({
  type: MAP_FAILURE,
  error,
});
