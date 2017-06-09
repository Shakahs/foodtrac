import { put, take, call } from 'redux-saga/effects';
import { stopSubmit } from 'redux-form';
import { actions } from './index';

const auth0 = require('auth0-js');
const globalConfig = require('globalConfig');  // eslint-disable-line  import/no-unresolved, import/no-extraneous-dependencies, max-len
const Promise = require('bluebird');

const webAuth = new auth0.WebAuth({
  domain: globalConfig.AUTH0_DOMAIN,
  clientID: globalConfig.AUTH0_CLIENT_ID,
});

function* dispatchFormError(formName, field, fieldError, formError = '') {
  const err = {};
  err[field] = fieldError;
  err['_error'] = formError; // eslint-disable-line dot-notation
  yield put(stopSubmit(formName, err));
}

function* validateCreateAccountForm(values) {
  // debugger
  if (values.password !== values.password2) {
    yield call(dispatchFormError, 'SignUp', 'password2', 'passwords must match');
  }
}

export function* watchCreateAccount() {
  while (true) {
    const { newUser } = yield take(actions.ACCOUNT_CREATE);
    yield call(validateCreateAccountForm, newUser);
    newUser.connection = globalConfig.AUTH0_DB_NAME;
    newUser.user_metadata = {};
    newUser.user_metadata.signed_up_as_truck_owner = (newUser.isTruckOwner) ? '1' : '0';
    yield call(Promise.fromCallback,
      callback => webAuth.signup(newUser, callback));
    yield put(actions.loginRequest({ email: newUser.email, password: newUser.password }));
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

export function* watchLoginRequest() {
  while (true) {
    if (window.location.hash) {
      yield call(handleReturnedHash);
    }

    const { credential } = yield take(actions.LOGIN_REQUEST);

    webAuth.redirect.loginWithCredentials({
      connection: globalConfig.AUTH0_DB_NAME,
      username: credential.email,
      password: credential.password,
      scope: 'openid',
      redirectUri: window.location.origin,
      responseType: 'token',
    }, (err) => { put(actions.loginFailure(err)); }); // error callback not working
  }
}

export function* watchLoginError() {
  while (true) {
    const { error } = yield take(actions.LOGIN_FAILURE);
    console.log(error);
  }
}
