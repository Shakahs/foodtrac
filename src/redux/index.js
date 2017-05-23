import { combineReducers } from 'redux';
import { reducer as mapReducer } from './MapSearch';
import { reducer as userReducer } from './user';

const combinedReducer = combineReducers({
  userReducer,
  mapReducer,
});

export default combinedReducer;
