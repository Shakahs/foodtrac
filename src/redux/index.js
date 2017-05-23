import { combineReducers } from 'redux';
import { reducer as userReducer } from './UserProfile';
import { reducer as mapReducer } from './MapSearch';

const combinedReducer = combineReducers({
  userReducer,
  mapReducer,
});

export default combinedReducer;
