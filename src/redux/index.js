import { combineReducers } from 'redux';
import { reducer as userReducer } from './UserProfile';

const combined = combineReducers({
  userReducer,
});

export default combined;
