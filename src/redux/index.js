import { combineReducers } from 'redux';
import { reducer as userReducer } from './UserProfile';
import { reducer as mapReducer } from './MapSearch';

const combined = combineReducers({
  userReducer,
  mapReducer,
});

export default combined;
