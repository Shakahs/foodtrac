import { put, take, call } from 'redux-saga/effects';
import { stopSubmit, SubmissionError } from 'redux-form';
import validator from 'validator';
import { actions } from './index';

const auth0 = require('auth0-js');
const globalConfig = require('globalConfig');  // eslint-disable-line  import/no-unresolved, import/no-extraneous-dependencies, max-len
const Promise = require('bluebird');

const webAuth = new auth0.WebAuth({
  domain: globalConfig.AUTH0_DOMAIN,
  clientID: globalConfig.AUTH0_CLIENT_ID,
});

function validateCreateAccountForm(values) {
  if (!values.first_name || !validator.isAlpha(`${values.first_name}`)) {
    throw new SubmissionError({ first_name: 'not a valid name' });
  }
  if (!values.last_name || !validator.isAlpha(`${values.last_name}`)) {
    throw new SubmissionError({ last_name: 'not a valid name' });
  }
  if (!validator.isEmail(`${values.email}`)) {
    throw new SubmissionError({ email: 'not a valid email' });
  }
  if (!values.password || values.password.length < 6) {
    throw new SubmissionError({ password: 'passwords must be at least 6 characters' });
  }
  if (values.password !== values.password2) {
    throw new SubmissionError({ password2: 'passwords must match' });
  }
}

export function* watchCreateAccount() {
  while (true) {
    try {
      const { newUser } = yield take(actions.ACCOUNT_CREATE);
      yield call(validateCreateAccountForm, newUser);
      newUser.connection = globalConfig.AUTH0_DB_NAME;
      newUser.user_metadata = {};
      newUser.user_metadata.signed_up_as_truck_owner = (newUser.isTruckOwner) ? '1' : '0';
      newUser.user_metadata.first_name = newUser.first_name;
      newUser.user_metadata.last_name = newUser.last_name;
      yield call(Promise.fromCallback,
        callback => webAuth.signup(newUser, callback));
      yield put(actions.loginRequest({ email: newUser.email, password: newUser.password }));
    } catch (e) {
      if (e instanceof SubmissionError) {
        yield put(stopSubmit('SignUp', e.errors));
      } else if (e.code === 'user_exists') {
        yield put(stopSubmit('SignUp', { email: 'email already registered' }));
      } else {
        console.log(e);
        // debugger
      }
    }
  }
}

function* handleReturnedHash() {
  const tokenData = yield call(Promise.fromCallback,
    callback => webAuth.parseHash(window.location.hash, callback));
  const profileData = yield call(Promise.fromCallback,
    callback => webAuth.client.userInfo(tokenData.accessToken, callback));
  // const profileData = null
  yield put(actions.loginSuccess(tokenData, profileData));
}


function validateLoginForm(values) {
  if (!validator.isEmail(`${values.email}`)) {
    throw new SubmissionError({ email: 'email required' });
  }
  if (!values.password) {
    throw new SubmissionError({ password: 'password required' });
  }
}

export function* watchLoginRequest() {
  while (true) {
    if (window.location.hash) {
      yield call(handleReturnedHash);
    }

    try {
      const { credential } = yield take(actions.LOGIN_REQUEST);
      yield call(validateLoginForm, credential);

      yield call(Promise.fromCallback,
        callback => webAuth.redirect.loginWithCredentials({
          connection: globalConfig.AUTH0_DB_NAME,
          username: credential.email,
          password: credential.password,
          scope: 'openid',
          redirectUri: window.location.origin,
          responseType: 'token',
        }, callback));
    } catch (e) {
      if (e instanceof SubmissionError) {
        yield put(stopSubmit('Login', e.errors));
      } else if (e.statusCode && e.statusCode >= 400) {
        yield put(stopSubmit('Login', { _error: 'Access denied, please retry' }));
      }
    }
  }
}

export function* watchLoginError() {
  while (true) {
    const { error } = yield take(actions.LOGIN_FAILURE);
    console.log(error);
  }
}
