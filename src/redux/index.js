import { combineReducers } from 'redux';
import { reducer as userReducer } from './UserProfile';

const combinedReducer = combineReducers({
  userReducer,
});

export default combinedReducer;
