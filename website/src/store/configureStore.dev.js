import { createStore, applyMiddleware, compose } from 'redux';
import { createLogger } from 'redux-logger';
import throttle from 'lodash/throttle';
import { loadState, saveState } from './localStorage';
import rootReducer from '../reducers';
import DevTools from '../containers/DevTools';

const configureStore = () => {
  const preloadedState = loadState();

  const store = createStore(
    rootReducer,
    preloadedState,
    compose(
      applyMiddleware(createLogger()),
      DevTools.instrument()
    )
  );

  store.subscribe(
    throttle(() => {
      saveState(store.getState());
    }, 1000)
  );

  if (module.hot) {
    module.hot.accept('../reducers', () => {
      store.replaceReducer(rootReducer);
    });
  }

  return store;
};

export default configureStore;
