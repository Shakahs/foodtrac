import { put, take, call } from 'redux-saga/effects';
import { actions } from './index';

const auth0 = require('auth0-js');
const globalConfig = require('globalConfig');  // eslint-disable-line  import/no-unresolved, import/no-extraneous-dependencies, max-len
const Promise = require('bluebird');

const webAuth = new auth0.WebAuth({
  domain: globalConfig.AUTH0_DOMAIN,
  clientID: globalConfig.AUTH0_CLIENT_ID,
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
      connection: globalConfig.AUTH0_DB_NAME,
      username: credential.userName,
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
