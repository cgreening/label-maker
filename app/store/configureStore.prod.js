import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';

export default function configureStore(reducers) {
  const finalCreateStore = compose(applyMiddleware(thunkMiddleware))(createStore);

  const store = finalCreateStore(combineReducers(reducers));
  return store;
}
