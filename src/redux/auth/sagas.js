import { put, take } from 'redux-saga/effects';
import { actions } from './index';

const auth0 = require('auth0-js');

const webAuth = new auth0.WebAuth({
  domain: 'foodtrac.auth0.com',
  clientID: '3HQ9cjUcngz4HMydOE6lsPSk6zUJVl49',
});

export function* watchLoginRequest() {
  while (true) {
    if (window.location.hash) {
      webAuth.parseHash(window.location.hash, (err, authResult) => { // eslint-disable-line consistent-return, max-len
        if (err) {
          return console.log(err);
        }

        webAuth.client.userInfo(authResult.accessToken, (profileErr, user) => {
          // Now you have the user's information
          console.log(authResult, user);
        });
      });
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
