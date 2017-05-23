import { combineReducers } from 'redux';
import { reducer as userReducer } from './UserProfile';
import { reducer as mapReducer } from './MapSearch';
import { reducer as mapTrucksReducer } from './MapTrucks';

const combined = combineReducers({
  userReducer,
  mapReducer,
  mapTrucksReducer,
});

export default combined;
