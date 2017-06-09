import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { reducer as mapReducer } from './MapSearch';
import { reducer as userReducer } from './user';
import { reducer as swReducer } from './ServiceWorker';
import { reducer as authReducer } from './auth';
import { reducer as profileReducer } from './CurrentProfile';
import { reducer as foodGenresReducer } from './FoodGenres';
import { reducer as loadingReducer } from './Loading';

const combinedReducer = combineReducers({
  map: mapReducer,
  foodGenresReducer,
  auth: authReducer,
  user: userReducer,
  sw: swReducer,
  form: formReducer,
  profile: profileReducer,
  loading: loadingReducer,
});

export default combinedReducer;
