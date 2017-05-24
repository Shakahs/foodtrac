import { put, take, call } from 'redux-saga/effects';
import { actions } from './index';

const auth0 = require('auth0-js');
const Promise = require('bluebird');

const webAuth = new auth0.WebAuth({
  domain: 'foodtrac.auth0.com',
  clientID: '3HQ9cjUcngz4HMydOE6lsPSk6zUJVl49',
});

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
      connection: 'Username-Password-Authentication',
      username: credential.userName,
      password: credential.password,
      scope: 'openid',
      redirectUri: 'http://localhost:3000',
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
