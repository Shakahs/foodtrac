import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { reducer as mapReducer } from './MapSearch';
import { reducer as userReducer } from './user';
import { reducer as authReducer } from './auth';

const combinedReducer = combineReducers({
  mapReducer,
  auth: authReducer,
  user: userReducer,
  form: formReducer,
});

export default combinedReducer;
