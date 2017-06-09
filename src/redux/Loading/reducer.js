const Immutable = require('seamless-immutable').static;

export const START_LOADING = 'START_LOADING';
export const END_LOADING = 'END_LOADING';

const initialState = {
  loading: false,
};

export default function reducer(state = Immutable(initialState), action) {
  switch (action.type) {
    case START_LOADING:
      return Immutable.merge(state, { loading: true });
    case END_LOADING:
      return Immutable.merge(state, { loading: false });
    default:
      return state;
  }
}

export const startLoading = () => ({
  type: START_LOADING,
});

export const endLoading = () => ({
  type: END_LOADING,
});
