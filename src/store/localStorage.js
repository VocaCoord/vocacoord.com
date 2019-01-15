import { localStorageKey } from '../constants/Assorted';
import initializeState from './initializeState';

export const loadState = () => {
  try {
    const serializedState = localStorage.getItem(localStorageKey);
    if (serializedState === null) return initializeState();
    return JSON.parse(serializedState);
  } catch (err) {
    return initializeState();
  }
};

export const saveState = state => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(localStorageKey, serializedState);
  } catch (err) {
    // ignore errors for now
  }
};
