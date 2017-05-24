import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { reducer as mapReducer } from './MapSearch';
import { reducer as userReducer } from './user';

const combinedReducer = combineReducers({
  mapReducer,
  user: userReducer,
  form: formReducer,
});

export default combinedReducer;
