import { createStore } from 'redux';
import throttle from 'lodash/throttle';
import { loadState, saveState } from './localStorage';
import rootReducer from '../reducers';

const configureStore = () => {
  const preloadedState = loadState();

  const store = createStore(rootReducer, preloadedState);

  store.subscribe(
    throttle(() => {
      saveState(store.getState());
    }, 1000)
  );

  return store;
};

export default configureStore;
