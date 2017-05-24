import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { applyMiddleware, createStore, compose } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import injectTapEventPlugin from 'react-tap-event-plugin';
import logger from 'redux-logger';
import { persistStore, autoRehydrate } from 'redux-persist';
import Root from './components/Root';

import reducers from './redux';
import rootSaga from './redux/rootSaga';

injectTapEventPlugin();

const sagaMiddleware = createSagaMiddleware();
function createStoreWithMiddleware() {
  const middleware = [logger, sagaMiddleware];
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // eslint-disable-line no-underscore-dangle, max-len
  const store = createStore(reducers
    , undefined, composeEnhancers(
      applyMiddleware(...middleware),
      autoRehydrate(),
    ));
  persistStore(store, { blacklist: ['form'] }, () => {
    console.log('rehydration complete');
  });
  sagaMiddleware.run(rootSaga);
  return store;
}

const store = createStoreWithMiddleware();

const render = (Component) => {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <Component />
      </Provider>
    </AppContainer>,
    document.getElementById('root'),
  );
};

render(Root);

if (module.hot) {
  module.hot.accept('./components/Root', () => { render(Root); });
}
