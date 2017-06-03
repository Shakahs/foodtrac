import { REHYDRATE } from 'redux-persist/constants';
import _ from 'lodash';
import { actions as authActions } from '../auth';

const Immutable = require('seamless-immutable').static;

export const USER_RECEIVED = 'USER_RECEIVED';
export const USER_FAILURE = 'USER_FAILURE';
export const USER_NEW_FOLLOW = 'USER_NEW_FOLLOW';
export const USER_RM_FOLLOW = 'USER_RM_FOLLOW';
export const BRAND_INFO_UPDATE = 'BRAND_INFO_UPDATE';
export const REDIRECT_ADDBRAND_ENABLE = 'REDIRECT_ADDBRAND_ENABLE';
export const REDIRECT_ADDBRAND_DISABLE = 'REDIRECT_ADDBRAND_DISABLE';
export const ADD_BRAND = 'ADD_BRAND';
export const ADD_BRAND_REQUEST = 'ADD_BRAND_REQUEST';
export const USER_BECOME_OWNER_REQ = 'USER_BECOME_OWNER_REQ';

const initialState = {
  id: null,
  email: null,
  is_truck_owner: false,
  auth0_id: null,
  user_follows: [],
  brands: [],
  redirectToAddBrand: false,
};

export default function reducer(state = Immutable(initialState), action) {
  switch (action.type) {
    case REHYDRATE:
      if (action.payload.user) return Immutable.merge(state, action.payload.user);
      return state;
    case USER_RECEIVED:
      return Immutable.merge(state, action.user);
    // case USER_FAILURE:
    //   return Object.assign({}, state, { fetching: false, error: action.error });
    case ADD_BRAND:
      return Immutable.merge(state, { brands: [...state.brands, action.brand] });
    case BRAND_INFO_UPDATE:
      return Immutable.merge(state, { brands: action.brands });
    case USER_NEW_FOLLOW:
      return Immutable.merge(state, { user_follows: [...state.user_follows, action.newFollow] });
    case USER_RM_FOLLOW:
      return Immutable.merge(state, {
        user_follows: _.filter(state.user_follows, follow => follow.id !== action.brandId),
      });
    case REDIRECT_ADDBRAND_ENABLE:
      return Immutable.merge(state, { redirectToAddBrand: true });
    case REDIRECT_ADDBRAND_DISABLE:
      return Immutable.merge(state, { redirectToAddBrand: false });
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

export const userNewFollow = newFollow => ({
  type: USER_NEW_FOLLOW,
  newFollow,
});

export const userRemoveFollow = brandId => ({
  type: USER_RM_FOLLOW,
  brandId,
});

export const userBecomeOwnerReq = id => ({
  type: USER_BECOME_OWNER_REQ,
  id,
});

export const brandInfoUpdate = brands => ({
  type: BRAND_INFO_UPDATE,
  brands,
});

export const addBrandRequest = body => ({
  type: ADD_BRAND_REQUEST,
  body,
});

export const addBrand = brand => ({
  type: ADD_BRAND,
  brand,
});

export const redirectAddBrandEnable = () => ({
  type: REDIRECT_ADDBRAND_ENABLE,
});

export const redirectAddBrandDisable = () => ({
  type: REDIRECT_ADDBRAND_DISABLE,
});

// export const userFailure = error => ({
//   type: USER_FAILURE,
//   error,
// });
