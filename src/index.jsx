import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Root from './components/Root';

import reducers from './redux';
import rootSaga from './redux/rootSaga';

injectTapEventPlugin();

const sagaMiddlware = createSagaMiddleware();
const store = createStore(reducers, applyMiddleware(sagaMiddlware));
sagaMiddlware.run(rootSaga);

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
