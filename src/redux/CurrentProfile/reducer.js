import _ from 'lodash';

export const NEW_BRAND_PROFILE = 'NEW_BRAND_PROFILE';
export const PROFILE_UPVOTE_REQ = 'PROFILE_UPVOTE_REQ';
export const NEW_UPVOTE = 'NEW_UPVOTE';

const initialState = {
  upvotes: [],
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case NEW_BRAND_PROFILE:
      return Object.assign({}, state, { upvotes: action.upvotes });
    case NEW_UPVOTE: // eslint-disable-line no-case-declarations
      const upvotes = _.map(state.upvotes, upvote => Object.assign({}, upvote));
      upvotes.push(action.upvote);
      return Object.assign({}, state, { upvotes });
    default:
      return state;
  }
}

export const newBrandProfile = upvotes => ({
  type: NEW_BRAND_PROFILE,
  upvotes,
});

export const profileUpvoteReq = (userId, brandId) => ({
  type: PROFILE_UPVOTE_REQ,
  userId,
  brandId,
});

export const newUpvote = upvote => ({
  type: NEW_UPVOTE,
  upvote,
});
