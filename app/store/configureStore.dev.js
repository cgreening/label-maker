/* eslint no-underscore-dangle: 0 */
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';

const loggerMiddleware = createLogger({
  collapsed: true
});

export default function configureStore(reducers) {
  const finalCreateStore = compose(
    // Middleware you want to use in development:
    applyMiddleware(thunkMiddleware, loggerMiddleware),
    // Required! Enable Redux DevTools with the monitors you chose
    // DevTools.instrument()
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )(createStore);

  const store = finalCreateStore(combineReducers(reducers));
  // handle hot reloading
  if (module.hot) {
    module.hot.accept('../reducers/index', () => {
      /* eslint-disable */
      const nextReducer = combineReducers(require('../reducers/index'));
      /* eslint-enable */
      store.replaceReducer(nextReducer);
    });
  }
  return store;
}
