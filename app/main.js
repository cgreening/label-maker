// @flow
import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import reducers from './reducers'
import configureStore from './store/configureStore';
import Index from './components/index';

// @flow
import 'semantic-ui-css/semantic.min.css';

const store = configureStore(reducers);
const rootEl = document.getElementById('app');

if(rootEl) {
  const render = (Component): void => {  
    ReactDOM.render(
      <Provider store={store}>
        <AppContainer>
          <Component />
        </AppContainer>
      </Provider>,
      rootEl
    );  
  };

  render(Index);

  // Hot Module Replacement API
  /* eslint-disable */
  if (module.hot) {
    // $FlowIgnore: suppressing this error
    module.hot.accept('./components/index', () => {
      const NextIndex = require('./components/index').default;
      render(NextIndex);
    });
  }
  /* eslint-enable */
} else {
  console.error('Cannot find "app" element to mount react')
}
